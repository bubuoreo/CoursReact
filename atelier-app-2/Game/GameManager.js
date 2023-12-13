const userManager = require('./userManager');

function initialize(io, socket) {
    socket.on('startgame', (data) => {
        userManager.addPlayerToWaitingList(socket, data.userId, data.cards);
    });

    // Autres gestionnaires d'événements...
}

module.exports = { initialize };