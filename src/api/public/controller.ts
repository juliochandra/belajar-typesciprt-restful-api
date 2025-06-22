import type { NextFunction, Request, Response } from "express";
import { UserService } from "./service";

const userService = new UserService();

export class UserController {
	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const response = await userService.register(req.body);

			res.status(201).json({
				data: {
					user: response,
				},
				message: "Success register new user",
				success: true,
			});
		} catch (error) {
			next(error);
		}
	}

	async login(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const response = await userService.login(req.body);

			res
				.status(200)
				.cookie("authorization", response, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
					maxAge: 7 * 24 * 60 * 60 * 1000,
				})
				.json({
					data: {
						token: response,
					},
					message: "Success login",
					success: true,
				});
		} catch (error) {
			next(error);
		}
	}
}
