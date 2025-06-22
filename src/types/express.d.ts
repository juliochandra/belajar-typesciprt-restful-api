import type { UserResponseDto } from "../api/public/schema";

declare global {
	namespace Express {
		interface Request {
			user?: Pick<UserResponseDto, "id", "email", "name">;
		}
	}
}
