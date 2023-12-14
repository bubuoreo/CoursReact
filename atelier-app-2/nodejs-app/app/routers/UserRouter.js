const PingRouter = require('./PingRouter.js')
const GameController = require('../controllers/GameController.js')

const express = require('express');

const BASE_PATH = '/user';

const UserRouter = express.Router();

UserRouter.use(BASE_PATH, PingRouter);

UserRouter.route(BASE_PATH)
    .get(GameController.getUsers)
    .post(GameController.createUser);

UserRouter.route(`${BASE_PATH}/:userId`)
    .get(GameController.getUser);

module.exports = UserRouter;