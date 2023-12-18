class GameService {

    constructor(userManager) {
        this.userManager = userManager;
        this.gameRooms = {};
        this.waitingUsersId = {};
    }

    init({ id, cards }) {
        this.addUserToWaitingList({ id: id, cards: cards });
        const userIdWaitingList = Object.keys(this.waitingUsersId);
        console.log(`GameService : taille waiting list ${userIdWaitingList.length}`);
        if (userIdWaitingList.length >= 2) {
            const Player1 = this.waitingUsersId[userIdWaitingList.shift()];
            delete this.waitingUsersId[Player1];
            const Player2 = this.waitingUsersId[userIdWaitingList.shift()];
            delete this.waitingUsersId[Player2];
            const roomKey = this.createRoom({ infoPlayer1: Player1, infoPlayer2: Player2 });
            console.log(`GameService: Création de la room ${roomKey} avec les players ${Player1.id} et ${Player2.id}`);
            console.log(this.gameRooms[roomKey]);
        }
        else {
            console.log(`Pas assez de joueurs disponibles`);
        }
    }

    addUserToWaitingList({ id, cards }) {
        const playerInfo = {
            "id": id,
            "cards": cards
        }
        this.waitingUsersId[id] = playerInfo;
        console.log(this.waitingUsersId);
    }

    createRoom({ infoPlayer1, infoPlayer2 }) {
        const roomKey = getRandomInt(1, 100);
        const socketPlayer1 = this.userManager.getSocket({ id: infoPlayer1.id });
        const socketPlayer2 = this.userManager.getSocket({ id: infoPlayer2.id });
        const roomInfo = {
            "player1": {
                "id": infoPlayer1.id,
                "socket": socketPlayer1,
                "gamePoints": 2,
                "canAttack": true,
                "cards": infoPlayer1.cards
            },
            "player2": {
                "id": infoPlayer2.id,
                "socket": socketPlayer2,
                "gamePoints": 2,
                "canAttack": false,
                "cards": infoPlayer2.cards
            }
        };
        this.gameRooms[roomKey] = roomInfo;
        return roomKey;
    }

    getRoom({ id }) {

    }

    attaque({userId, cardId, opponentCardId}){
        console.log("On va attaquer");
        const { userId, cardId, opponentCardId } = data;
        for (const room of gameRooms) {
            console.log(room);
            user1 = room.find(user => user.userId === userId);
            if (user1) {
                user2 = room.find(user => user.userId !== userId);
                GR = room
                if (user1.canAttack) {
                  if (user1.GamePoint > 0) {
                    cardAttack = user1.cards.find(card => card.cardid === cardId);
                    cardDefense = user2.cards.find(card => card.cardid === opponentCardId);
                    if (cardAttack && cardDefense && cardAttack.defense > 0 && cardDefense.defense > 0) {
                      cardDefense.defense = cardDefense.defense - cardAttack.attaque;
                      if (cardDefense.defense < 0) {
                        cardDefense.defense = 0;
                      }
                      const indexCarte = user2.cards.findIndex(card => card.cardid === opponentCardId);
                      if (indexCarte !== -1) {
                        user2.cards[indexCarte] = cardDefense;
                        user1.GamePoint = user1.GamePoint - 1;
                        const NGR = [user1, user2];
                        gameRooms.pop(GR);
                        if (CalculEndGame(user2)) {
                          const userDataForPlayer1 = { looser: user2, winner: user1 };
                          const userDataForPlayer2 = { winner: user1, looser: user2 };
                          io.to(user1.socketId).emit('resultat_attaque', userDataForPlayer1);
                          io.to(user2.socketId).emit('resultat_attaque', userDataForPlayer2);
                          delete usersInRoom[user1.userId];
                          delete usersInRoom[user2.userId];
                          modifyMoney(user1, 100);
                          modifyMoney(user2, -100);
                        } else {
                          gameRooms.push(NGR);
                          const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
                          const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
                          io.to(user1.socketId).emit('resultat_attaque', userDataForPlayer1);
                          io.to(user2.socketId).emit('resultat_attaque', userDataForPlayer2);
                        }
                      } else {
                        io.to(user1.socketId).emit('erreur_attaque', 'attack failed, card unknown');
                      }
                    } else {
                      io.to(user1.socketId).emit('erreur_attaque', 'wrong card');
                    }
                  } else {
                    io.to(user1.socketId).emit('erreur_attaque', 'No GamePoint. you can just end your turn');
                  }
                } else {
                  io.to(user1.socketId).emit('erreur_attaque', 'You are not allowed to attack.');
                }
                break;
              }
            }
    };

    endTurn({data}){
        console.log(data);
        const {userId} = data;
        for (const room of gameRooms) {
          user1 = room.find(user => user.userId === userId);
          if (user1) {
            if(user1.canAttack){
              user2 = room.find(user => user.userId !== userId);
              user1.canAttack=false;
              user2.canAttack=true;
              user2.GamePoint=user2.GamePoint+1;
              GR = room
              const NGR = [user1, user2];
              gameRooms.pop(GR);
              gameRooms.push(NGR);
              const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
              const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
              io.to(user1.socketId).emit('resultat_attaque', userDataForPlayer1);
              io.to(user2.socketId).emit('resultat_attaque', userDataForPlayer2);
            }else{
              io.to(user1.socketId).emit('erreur_attaque', 'not your turn' );
            }
          }
        }
      };
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GameService;