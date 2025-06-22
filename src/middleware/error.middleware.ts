import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpException } from "../error/Errors";
// import { logger } from "../config/logger";

export const errorMiddleware = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	// logger.error(err.message);
	// Check both the instance and the name property
	if (err instanceof ZodError) {
		const errorMessage = err.errors
			.map((e) => `${e.path}: ${e.message}`)
			.join(", ");

		res.status(422).json({
			errors: true,
			message: `Validation failed ${errorMessage}`,
			success: false,
		});
		return;
	}

	if (err instanceof HttpException) {
		res.status(err.status).json({
			errors: err.errors || true,
			message: err.message,
			success: false,
		});
		return;
	}

	res.status(500).json({
		errors: true,
		message: "Internal Server Error",
		success: false,
	});
};
