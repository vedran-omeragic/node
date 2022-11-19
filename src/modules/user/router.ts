import { NextFunction, Request, Response, Router } from "express";

import { validateRequest } from "../../middleware/validate-request.middleware";

import UserController from "./controller";
import { NewUserSchema, UserIdSchema } from "./schema";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	return UserController.getUserList(req, res, next);
});

userRouter.post("/", validateRequest(NewUserSchema), (req: Request, res: Response, next: NextFunction) => {
	return UserController.createUser(req, res, next);
});

userRouter.get("/:id", validateRequest(UserIdSchema), (req: Request, res: Response, next: NextFunction) => {
	return UserController.getUserWithId(req, res, next);
});

export default userRouter;
