class GameService {

    constructor(userManager) {
        this.userManager = userManager;
        this.gameRooms = {};
        this.waitingUsersId = {};
        this.moneyPrice = 20;
    }

    init({ id, cards, money }) {
        this.addUserToWaitingList({ id: id, cards: cards, wallet: money });
        const userIdWaitingList = Object.keys(this.waitingUsersId);
        console.log(`GameService : taille waiting list ${userIdWaitingList.length}`);
        if (userIdWaitingList.length >= 2) {
            const Player1 = this.waitingUsersId[userIdWaitingList.shift()];
            delete this.waitingUsersId[Player1.id];

            const Player2 = this.waitingUsersId[userIdWaitingList.shift()];
            delete this.waitingUsersId[Player2.id];

            const roomKey = this.createRoom({ infoPlayer1: Player1, infoPlayer2: Player2 });
            console.log(`GameService: Création de la room ${roomKey} avec les players ${Player1.id} et ${Player2.id}`);
            console.log(this.gameRooms[roomKey]);

            const infoPlayer1 = { "myDetails": this.gameRooms[roomKey].player1, "opponentDetails": this.gameRooms[roomKey].player2 };
            const infoPlayer2 = { "myDetails": this.gameRooms[roomKey].player2, "opponentDetails": this.gameRooms[roomKey].player1 };

            // Faire remonter au controller les infos des deux joueurs
            return { infoPlayer1, infoPlayer2 };
        }
        else {
            console.log(`Pas assez de joueurs disponibles`);
        }
    }

    addUserToWaitingList({ id, cards, wallet }) {
        const playerInfo = {
            "id": id,
            "cards": JSON.parse(cards),
            "wallet": wallet
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
                "socketId": socketPlayer1.id,
                "wallet": infoPlayer1.wallet,
                "gamePoints": 2,
                "canAttack": true,
                "cards": infoPlayer1.cards
            },
            "player2": {
                "id": infoPlayer2.id,
                "socketId": socketPlayer2.id,
                "wallet": infoPlayer2.wallet,
                "gamePoints": 2,
                "canAttack": false,
                "cards": infoPlayer2.cards
            }
        };
        this.gameRooms[roomKey] = roomInfo;
        return roomKey;
    }



    getRoomDetails({ userId }) {
        for (const room of Object.keys(this.gameRooms)) {
            const playersInRoom = Object.values(this.gameRooms[room]);
            const player1 = playersInRoom.find(player => player.id === userId);
            if (player1) {
                const player2 = playersInRoom.find(player => player.id !== userId);
                return [room, player1, player2];
            }
        }
    }

    attaque({ userId, cardId, opponentCardId }) {
        console.log("On va attaquer");
        var [roomId, attackPlayer, defensePlayer] = this.getRoomDetails({ userId: userId });
        const room = this.gameRooms[roomId];
        if (attackPlayer.canAttack) {
            if (attackPlayer.gamePoints > 0) {
                const cardAttack = attackPlayer.cards[cardId];
                const cardDefense = defensePlayer.cards[opponentCardId];
                if (cardAttack && cardDefense && cardAttack.hp > 0 && cardDefense.hp > 0) {
                    cardDefense.hp = cardDefense.hp - (cardAttack.att - cardDefense.def);
                    // TODO: Ajout CC, esquive, etc...
                    if (cardDefense.hp < 0) {
                        cardDefense.hp = 0;
                    }

                    // MAJ dans les cartes du défenseur des hp de la carte visée
                    defensePlayer.cards[opponentCardId].hp = cardDefense.hp;
                    // Vérifier si l'attaque qui vient d'être lancée signe la fin du jeu
                    if (this.isEndGame({ player: defensePlayer })) {

                        attackPlayer = this.updateWallet({ player: attackPlayer, amount: this.moneyPrice })
                        defensePlayer = this.updateWallet({ player: defensePlayer, amount: -this.moneyPrice })

                        const infoPlayer1 = { "self": attackPlayer, "opponent": defensePlayer };
                        const infoPlayer2 = { "self": defensePlayer, "opponent": attackPlayer };

                        return ["end", { infoPlayer1, infoPlayer2 }];
                    }
                    // Enlever un gamePoint au joueur
                    attackPlayer.gamePoints -= 1;
                    
                    // MAJ de la room
                    // room["player1"] = attackPlayer;
                    // room["player2"] = attackPlayer;
                    // console.log(room);

                    const infoPlayer1 = { "self": attackPlayer, "opponent": defensePlayer };
                    const infoPlayer2 = { "self": defensePlayer, "opponent": attackPlayer };
                    return ["success", { infoPlayer1, infoPlayer2 }];
                } else {
                    return ["failure", 'Card invalid']
                    // io.to(attackPlayer.socketId).emit('fail_attack', 'Card invalid');
                }
            } else {
                return ["failure", 'No game points left. Press the button "End turn".']
                // io.to(attackPlayer.socketId).emit('fail_attack', 'No game points left. Press the button "End turn".');
            }
        } else {
            return ["failure", 'It is not your turn to attack, wait for the end of your opponent turn.']
            // io.to(attackPlayer.socketId).emit('fail_attack', 'It is not your turn to attack, wait for the end of your opponent turn.');

        }
    }


    endTurn({ data }) {
        console.log(data);
        const { userId } = data;
        for (const room of gameRooms) {
            user1 = room.find(user => user.userId === userId);
            if (user1) {
                if (user1.canAttack) {
                    user2 = room.find(user => user.userId !== userId);
                    user1.canAttack = false;
                    user2.canAttack = true;
                    user2.GamePoint = user2.GamePoint + 1;
                    GR = room
                    const NGR = [user1, user2];
                    gameRooms.pop(GR);
                    gameRooms.push(NGR);
                    const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
                    const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
                    io.to(user1.socketId).emit('resultat_attaque', userDataForPlayer1);
                    io.to(user2.socketId).emit('resultat_attaque', userDataForPlayer2);
                } else {
                    io.to(user1.socketId).emit('erreur_attaque', 'not your turn');
                }
            }
        }
    }

    isEndGame({ player }) {
        const playerCards = Object.values(player.cards);
        return playerCards.every(card => card.hp <= 0);
    }

    updateWallet({ player, amount }) {
        player.wallet += amount;
        return player;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GameService;