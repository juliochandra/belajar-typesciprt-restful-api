import { z } from "zod";

export const UserSchema = {
	Register: z
		.object({
			email: z.string().trim().email().max(100),
			password: z.string().trim().min(8).max(100),
			name: z.string().trim().min(1).max(100),
		})
		.strict(),

	Login: z
		.object({
			email: z.string().trim().email().max(100),
			password: z.string().trim().min(8).max(100),
		})
		.strict(),

	UserResponse: z
		.object({
			id: z.string().cuid(),
			createdAt: z.date(),
			updatedAt: z.date(),
			email: z.string().email(),
			name: z.string(),
		})
		.strict(),
};

export type CreateUserRequestDto = z.infer<typeof UserSchema.Register>;
export type LoginUserRequestDto = z.infer<typeof UserSchema.Login>;
export type UserResponseDto = z.infer<typeof UserSchema.UserResponse>;
