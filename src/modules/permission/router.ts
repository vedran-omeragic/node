import { NextFunction, Request, Response, Router } from "express";

import PermissionController from "./controller";

const permissionRouter = Router();

permissionRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	return PermissionController.getAllPermissions(req, res, next);
});

export default permissionRouter;
