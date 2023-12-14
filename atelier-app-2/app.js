const CONFIG = require('./config.json')

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Importe les services et controllers dont on a besoin
const MessageController = require("./nodejs-app/app/controllers/MessageController.js");
// const UserRouter = require('./nodejs-app/app/routers/UserRouter.js');
const PingRouter = require('./nodejs-app/app/routers/PingRouter.js');
const SpringbootService = require('./nodejs-app/app/services/SpringbootService.js');


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

// app.use(CONFIG.apiPath, UserRouter);
app.use(CONFIG.apiPath, PingRouter);

app.get('/api/users', async (req, res) => {
    console.log('On a compris que tu voulais les users du serveur Springboot');
    SpringbootService.getAllUsers(req, res)
});

server.listen(port, () => {
    console.log("server is running on port", server.address().port);
});