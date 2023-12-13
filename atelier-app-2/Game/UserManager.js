let connectedUsers = {}; // Stocke les utilisateurs en attente de partie
let usersInRoom = {}; // stocke les joueurs en partie
let gameRooms = []; // Stocker les salles de jeu

function addPlayerToWaitingList(socket, userId, cards) {
    if (!usersInRoom[userId]) {
        connectedUsers[userId] = {
            socketId: socket.id,
            userId: userId,
            GamePoint: 2,
            canAttack: false,
            cards: cards.map(card => ({
                cardid: card.cardId,
                attaque: card.attaque,
                defense: card.defense
            }))
        };
        tryPairingPlayers(socket);
    }
}

function tryPairingPlayers(socket) {
    const connectedUserIds = Object.keys(connectedUsers);
    if (connectedUserIds.length >= 2) {
        const [user1, user2] = pickRandomPlayers(connectedUserIds);
        user1.canAttack = true;
        const gameRoom = [user1, user2];
        
        setupGameRoom(gameRoom);
        startGame(socket, user1, user2);
    }
}

function pickRandomPlayers(userIds) {
    let index1 = Math.floor(Math.random() * userIds.length);
    let index2 = Math.floor(Math.random() * userIds.length);
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * userIds.length);
    }
    return [connectedUsers[userIds[index1]], connectedUsers[userIds[index2]]];
}

function setupGameRoom(gameRoom) {
    gameRoom.forEach(player => {
        delete connectedUsers[player.userId];
        usersInRoom[player.userId] = { socketId: player.socketId, userId: player.userId };
    });
    gameRooms.push(gameRoom);
}

function startGame(socket, user1, user2) {
    const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
    const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
    
    socket.to(user1.socketId).emit('game_start', userDataForPlayer1);
    socket.to(user2.socketId).emit('game_start', userDataForPlayer2);
}

module.exports = { addPlayerToWaitingList, tryPairingPlayers, pickRandomPlayers, setupGameRoom, startGame}; // Exportez les fonctions nécessaires
