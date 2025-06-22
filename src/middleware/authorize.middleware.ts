import type { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../error/Errors";

const authorizeRoles = (...allowedRoles: string[]) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const userRole = req.user?.role;

		if (!userRole) {
			throw new UnauthorizedException("Unauthorized: Role is missing");
		}

		if (!allowedRoles.includes(userRole)) {
			throw new UnauthorizedException("Forbidden: Access denied");
		}

		next();
	};
};

export const authorize = {
	admin: authorizeRoles("admin"),
	moderator: authorizeRoles("moderator"),
	writer: authorizeRoles("writer"),
	user: authorizeRoles("user"),
};
