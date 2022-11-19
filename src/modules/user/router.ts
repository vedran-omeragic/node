import { NextFunction, Request, Response, Router } from "express";

import UserController from "./controller";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	return UserController.getUserList(req, res, next);
});

export default userRouter;
