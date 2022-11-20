import { NextFunction, Request, Response, Router } from "express";

import { validateRequest } from "../../middleware/validate-request.middleware";
import { UserPermissionSchema } from "../user_permission/schema";

import UserController from "./controller";
import { NewUserSchema, UpdateUserSchema, UserIdSchema } from "./schema";

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

userRouter.patch("/:id", validateRequest(UpdateUserSchema), (req: Request, res: Response, next: NextFunction) => {
	return UserController.updateUser(req, res, next);
});

userRouter.delete("/:id", validateRequest(UserIdSchema), (req: Request, res: Response, next: NextFunction) => {
	return UserController.deleteUser(req, res, next);
});

userRouter.get("/:id/perms/", validateRequest(UserIdSchema), (req: Request, res: Response, next: NextFunction) => {
	return UserController.getUserPermissions(req, res, next);
});

userRouter.post(
	"/:id/perms/",
	validateRequest({ ...UserIdSchema, ...UserPermissionSchema }),
	(req: Request, res: Response, next: NextFunction) => {
		return UserController.createUserPermission(req, res, next);
	}
);

userRouter.delete(
	"/:id/perms/",
	validateRequest({ ...UserIdSchema, ...UserPermissionSchema }),
	(req: Request, res: Response, next: NextFunction) => {
		return UserController.deleteUserPermission(req, res, next);
	}
);

export default userRouter;
