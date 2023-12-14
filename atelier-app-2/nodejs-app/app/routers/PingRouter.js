const express = require('express');
const PingController = require('../controllers/PingController.js');

const BASE_PATH = '/ping';

const PingRouter = express.Router();

PingRouter.route(BASE_PATH)
    .get(PingController.getPong);

module.exports = PingRouter;