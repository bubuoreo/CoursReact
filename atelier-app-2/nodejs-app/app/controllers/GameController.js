const UserManagerClass = require("../services/UserManager.js")
const GameServiceClass = require('../services/GameService.js')

class GameController {

    constructor() {
        this.userManager = new UserManagerClass();
        this.gameService = new GameServiceClass(this.userManager);
    }

    init({ io, socket, idUser }) {
        console.log(`GameController: ${idUser}`);
        // Appeler le UserManager pour sauvegarder la socket de l'utilisateur
        this.userManager.addUser({ id: idUser, socket: socket });
        this.userManager.getConnectedUsers();
        // Déléguer la création de cette écoute a un autre service
        socket.on('chat message', (msg) => {
            var parsedMsg = JSON.parse(msg);
            if (parsedMsg.hasOwnProperty('dest')) {
                var idDestUser = parsedMsg.dest;
                var displayMsg = `User${idUser} -> User${idDestUser}: "${parsedMsg.msg}"`;
                this.userManager.getSocket({ id: idDestUser }).emit('chat message', displayMsg);
                this.userManager.getSocket({ id: idUser }).emit('chat message', displayMsg);
            } else {
                var displayMsg = `User${idUser} : "${parsedMsg.msg}"`;
                io.emit('chat message', displayMsg);
            }
        });
        socket.on('play', (data) => {
            const { cardsJson, money } = data;
            const infos = this.gameService.init({ id: idUser, cards: cardsJson, money: money });
            if (infos !== undefined) {

                const socket1 = infos.infoPlayer1.myDetails.socketId;
                const socket2 = infos.infoPlayer2.myDetails.socketId;

                io.to(socket1).emit('start', JSON.stringify(infos.infoPlayer1));
                io.to(socket2).emit('start', JSON.stringify(infos.infoPlayer2));
            }
        });

        socket.on('attaque', (data) => {
            console.log("On attaque")
            const { cardId, opponentCardId } = data;
            const result = this.gameService.attaque({ userId: idUser, cardId: cardId, opponentCardId: opponentCardId });
            if (result !== undefined) {
                console.log(result);
                // TODO: io.emits()
            }
        });

        socket.on('endturn', (data) => {
            console.log("On change de joueur")
            this.gameService.endTurn();
        });

    }

    removeUser(idUser) {
        this.userManager.removeUser(idUser);
    };

    CalculEndGame(user) {
        return user.cards.every(card => card.defense <= 0);
    }
}

module.exports = GameController;