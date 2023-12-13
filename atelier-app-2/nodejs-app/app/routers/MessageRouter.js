import {Router} from "express";

const BASE_PATH = '/msg';

const MessageRouter = Router();
export default MessageRouter;

MessageRouter.use(BASE_PATH, PingRouter);

MessageRouter.route(BASE_PATH)
    .get(UserController.getUsers)
    .post(UserController.createUser);

MessageRouter.route(`${BASE_PATH}/:userId`)
    .get(UserController.getUser);
