const UserManager = require("../services/UserManager.js")

class MessageController {

    init({io, socket, idUser}) {
        console.log(`MessageController: ${idUser}`);
        // Appeler le UserManager pour sauvegarder la socket de l'utilisateur
        UserManager.addUser({id: idUser, socket: socket});
        UserManager.getConnectedUsers();
        // Déléguer la création de cette écoute a un autre service
        socket.on('chat message', (msg) => {
            // io.emit('chat message', msg);
            var parsedMsg = JSON.parse(msg);
            var idDestUser = parsedMsg.dest
            var displayMsg = `User${idUser} -> User${idDestUser}: "${parsedMsg.msg}"`
            UserManager.getSocket({id: idDestUser}).emit('chat message', displayMsg)
            UserManager.getSocket({id: idUser}).emit('chat message', displayMsg)
        });
    }

    removeUser(idUser) {
        UserManager.removeUser(idUser);
    }
}

module.exports = new MessageController()