const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const gameManager = require('./gameManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' }});

io.on('connection', (socket) => {
    console.log('Nouvelle connexion websocket établie.');
    gameManager.initialize(io, socket);
});

server.listen(9000, () => {
    console.log('Serveur WebSocket en cours d\'exécution sur le port 9000');
});
