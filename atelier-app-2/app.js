const CONFIG = require('./config.json')

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Importe les services et controllesr dont on a besoin
const MessageController = require("./nodejs-app/app/controllers/MessageController.js")


global.CONFIG = CONFIG;
const port = CONFIG.port;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
    const idUser = socket.handshake.query.id;
    console.log(`L'id du user est : ${idUser}`);
    console.log('Un utilisateur s\'est connecté');
    MessageController.init({io, socket, idUser});

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
        MessageController.removeUser(idUser);
    });
});

app.set("port", port);

app.use(express.static(CONFIG.www));

app.post('/msg', (req, res) => {
    console.log("coucou");
});

server.listen(port, () => {
    console.log("server is running on port", server.address().port);
});