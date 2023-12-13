const CONFIG = require('./config.json')
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

global.CONFIG = CONFIG;
const port = CONFIG.port;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

app.set("port", port);

app.get('/', (req, res) => {
    res.sendFile(__dirname + CONFIG.www + '/index.html');
});

server.listen(port, () => {
    console.log("server is running on port", server.address().port);
});