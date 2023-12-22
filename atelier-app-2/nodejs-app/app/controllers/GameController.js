const UserManagerClass = require("../services/UserManager.js")
const GameServiceClass = require('../services/GameService.js')
const SpringbootServiceClass = require('../services/SpringbootService.js')

class GameController {

    constructor(springbootPath) {
        this.userManager = new UserManagerClass();
        this.gameService = new GameServiceClass(this.userManager);
        this.springbootService = new SpringbootServiceClass(springbootPath);
        this.endTurn = this.endTurn.bind(this);
    }

    init({ io, socket, idUser }) {
        console.log(`GameController: init: ${idUser}`);
        // Appeler le UserManager pour sauvegarder la socket de l'utilisateur
        this.userManager.addUser({ id: idUser, socket: socket });
        // const connectedUsers = Array.from(this.userManager.getConnectedUsers());
        // io.emit('updateConnectedUsers', connectedUsers)
        // Déléguer la création de cette écoute a un autre service
        socket.on('chat message', (msg) => {
            var parsedMsg = JSON.parse(msg);
            if (parsedMsg.dest !== '-1' ) {
                var idDestUser = parsedMsg.dest;
                parsedMsg["emit"] = idUser;
                console.log(parsedMsg);
                try {
                    this.userManager.getSocket({ id: idDestUser }).emit('chat message', JSON.stringify(parsedMsg));
                } catch (error) {
                    console.log(error);
                }
                try {
                    this.userManager.getSocket({ id: idUser }).emit('chat message', JSON.stringify(parsedMsg));
                } catch (error) {
                    console.log(error);
                }
            } else {
                parsedMsg["emit"] = idUser;
                io.emit('chat message', JSON.stringify(parsedMsg));
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
            console.log("GameController: init: On attaque")
            const { source: cardId, target: opponentCardId } = data;
            const result = this.gameService.attaque({ userId: idUser, cardId: cardId, opponentCardId: opponentCardId });
            if (result !== undefined) {
                console.log("GameController: init: ");
                console.log(result[0]);
                console.log("GameController: init: ");
                console.log(result[1]);
                if (result[0] === 'failure') {
                    socket.emit('fail_attack', result[1]);
                } else if (result[0] === 'success_endTurn') {
                    this.endTurn({ idUser: idUser, io: io });
                } else if (result[0] === 'end') {
                    io.to(result[1].winner.socketId).emit('endGame', JSON.stringify(result[1]));
                    io.to(result[1].looser.socketId).emit('endGame', JSON.stringify(result[1]));
                    this.springbootService.updateUserMoney({userId: "6", newMoney: result[1].winner.wallet});
                    //this.springbootService.updateUserMoney({userId: result[1].looser.id, newMoney: result[1].looser.wallet});
                }
                else {
                    io.to(result[1].infoPlayer1.self.socketId).emit('feedback_attack', JSON.stringify(result[1].infoPlayer1));
                    io.to(result[1].infoPlayer2.self.socketId).emit('feedback_attack', JSON.stringify(result[1].infoPlayer2));
                }
            }
        });

        socket.on('endTurn', () => this.endTurn({ idUser: idUser, io: io }));

        socket.on('getSpringbootUsers', async () => {
            const result = await this.springbootService.getAllUsers()
            socket.emit('updateSpringbootUsers', JSON.stringify(result))
        });
    }

    endTurn({ idUser, io }) {
        console.log("GameController: endTurn: On change de joueur");
        const result = this.gameService.endTurn({ userId: idUser });
        if (result !== undefined) {
            console.log("GameController: endTurn: ");
            console.log(result);
            if (result[0] === 'failure') {
                socket.emit('fail_endTurn', result[1]);
            } else {
                io.to(result[1].infoPlayer1.self.socketId).emit('feedback_endTurn', JSON.stringify(result[1].infoPlayer1));
                io.to(result[1].infoPlayer2.self.socketId).emit('feedback_endTurn', JSON.stringify(result[1].infoPlayer2));
            }
        }
    };


    removeUser(idUser) {
        // TODO: enlever le joueur de la waitingList si il y était
        this.userManager.removeUser(idUser);
    };
}

module.exports = GameController;