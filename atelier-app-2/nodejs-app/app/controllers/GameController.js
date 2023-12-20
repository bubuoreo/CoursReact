const UserManagerClass = require("../services/UserManager.js")
const GameServiceClass = require('../services/GameService.js')
const SpringbootServiceClass = require('../services/SpringbootService.js')

class GameController {

    constructor() {
        this.userManager = new UserManagerClass();
        this.gameService = new GameServiceClass(this.userManager);
        this.springbootService = new SpringbootServiceClass();
    }

    init({ io, socket, idUser }) {
        console.log(`GameController: ${idUser}`);
        // Appeler le UserManager pour sauvegarder la socket de l'utilisateur
        this.userManager.addUser({ id: idUser, socket: socket });
        const connectedUsers = Array.from(this.userManager.getConnectedUsers());
        io.emit('updateConnectedUsers', connectedUsers)
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
            const { source: cardId, target: opponentCardId } = data;
            const result = this.gameService.attaque({ userId: idUser, cardId: cardId, opponentCardId: opponentCardId });
            if (result !== undefined) {
                console.log(result);
                if (result[0] === 'failure') {
                    socket.emit('fail_attack', result[1]);
                }
                else {
                    io.to(result[1].infoPlayer1.self.socketId).emit('feedback_attack', JSON.stringify(result[1].infoPlayer1));
                    io.to(result[1].infoPlayer2.self.socketId).emit('feedback_attack', JSON.stringify(result[1].infoPlayer2));
                }
            }
        });

        socket.on('endTurn', () => {
            console.log("On change de joueur")
            this.gameService.endTurn();
        });

        socket.on('getSpringbootUsers', async () => {
            this.springbootService.getAllUsers()
        });

    }

    removeUser(idUser) {
        // TODO: enlever le joueur de la waitingList si il y était
        this.userManager.removeUser(idUser);
    };

    CalculEndGame(user) {
        return user.cards.every(card => card.defense <= 0);
    }
}

module.exports = GameController;