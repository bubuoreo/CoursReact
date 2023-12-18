class GameService {

    constructor(userManager) {
        this.userManager = userManager;
        this.gameRooms = {};
        this.waitingUsersId = [];
    }

    init({ id }) {
        this.addUserToWaitingList({ id: id });
        console.log(this.waitingUsersId);
        if (this.waitingUsersId.length >= 2) {
            const idPlayer1 = this.waitingUsersId.shift();
            const idPlayer2 = this.waitingUsersId.shift();
            const roomKey = this.createRoom({ id1: idPlayer1, id2: idPlayer2 });
            console.log(`GameService: Création de la room ${roomKey} avec les players ${idPlayer1} et ${idPlayer2}`);
        }
        else {
            console.log(`Pas assez de joueurs disponibles`);
        }
    }

    addUserToWaitingList({ id }) {
        this.waitingUsersId.push(id);
    }

    createRoom({ id1, id2 }) {
        const roomKey = getRandomInt(1, 100);
        const socketPlayer1 = this.userManager.getSocket({id: id1});
        const socketPlayer2 = this.userManager.getSocket({id: id2});
        const roomInfo = {
            "player1":{
                "id": id1,
                "socket": socketPlayer1
            },
            "player2":{
                "id": id2,
                "socket": socketPlayer2
            }
        };
        this.gameRooms[roomKey] = roomInfo;
        return roomKey;
    }

    getRoom({id}) {
        
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GameService;