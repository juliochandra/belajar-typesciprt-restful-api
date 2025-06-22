import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny, z } from "zod";

export const validate = {
	body:
		(schema: ZodTypeAny) =>
		(req: Request, _res: Response, next: NextFunction): void => {
			try {
				schema.parse(req.body);
				next();
			} catch (error) {
				next(error);
			}
		},

	params:
		(schema: ZodTypeAny) =>
		(req: Request, _res: Response, next: NextFunction): void => {
			try {
				schema.parse(req.params);
				next();
			} catch (error) {
				next(error);
			}
		},

	query:
		(schema: ZodTypeAny) =>
		(req: Request, _res: Response, next: NextFunction): void => {
			try {
				schema.parse(req.query);
				next();
			} catch (error) {
				next(error);
			}
		},

	// response: <T extends ZodTypeAny>(
	// 	schema: T,
	// 	data: unknown,
	// ): ZodInfer<T> => {
	// 	return schema.parse(data);
	// },

	response: (schema: ZodTypeAny, data: object): z.infer<ZodTypeAny> => {
		return schema.parse(data);
	},
};
