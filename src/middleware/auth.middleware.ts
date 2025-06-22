import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../config/database";
import { verifyToken } from "../config/verifytoken";
import { UnauthorizedException } from "../error/Errors";

export const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const token: string = req.cookies?.authorization;

		if (!token) {
			throw new UnauthorizedException("Unauthenticated: Token is missing");
		}

		const verifedToken = verifyToken(token);

		const user = await Prisma.user.findUnique({
			where: {
				id: verifedToken.id,
			},
			select: {
				id: true,
				email: true,
				name: true,
			},
		});

		if (!user) {
			throw new UnauthorizedException("Unauthenticated user not exist");
		}

		req.user = user;

		next();
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unauthenticated";

		res.status(401).json({
			error: true,
			message,
			success: false,
		});
	}
};
