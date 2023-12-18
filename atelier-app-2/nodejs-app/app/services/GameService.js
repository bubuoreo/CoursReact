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
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GameService;