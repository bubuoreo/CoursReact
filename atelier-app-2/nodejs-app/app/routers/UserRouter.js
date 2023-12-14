const PingRouter = require('./PingRouter.js')
const UserController = require('../controllers/MessageController.js')

const express = require('express');

const BASE_PATH = '/user';

const UserRouter = express.Router();

UserRouter.use(BASE_PATH, PingRouter);

UserRouter.route(BASE_PATH)
    .get(UserController.getUsers)
    .post(UserController.createUser);

UserRouter.route(`${BASE_PATH}/:userId`)
    .get(UserController.getUser);

module.exports = UserRouter;