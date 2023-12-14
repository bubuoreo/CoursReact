class GameService {

    constructor(userManager) {
        this.userManager = userManager;
        this.gameRooms = {};
        this.waitingUsersId = [];
    }

    init({ id }) {
        this.addUserToWaitingList({ id: id });
        if (this.waitingUsersId.length() >= 2) {
            const idPlayer1 = this.waitingUsersId.splice(0);
            const idPlayer2 = this.waitingUsersId.splice(0);
            const roomKey = this.createRoom({ id1: idPlayer1, id2: idPlayer2 });
        }
    }

    addUserToWaitingList({ id }) {
        this.waitingUsersId.push(id);
    }

    createRoom({ id1, id2 }) {
        const roomKey = getRandomInt(1, 100);
        const roomInfo = {
            "player1":{
                "id": id1,
                "socket": "socket_object"
            },
            "player2":{
                "id": id2,
                "socket": "socket_object"
            }
        }
        this.gameRooms[roomKey] = ;
        return roomKey;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GameService;