import type { User } from "@prisma/client";
import { Prisma } from "../../config/database";
import type { CreateUserRequestDto, UserResponseDto } from "./schema";

const userSelect = {
	id: true,
	email: true,
	name: true,
	createdAt: true,
	updatedAt: true,
};

export class UserRepository {
	async findEmail(email: string): Promise<User | null> {
		const result = await Prisma.user.findFirst({
			where: {
				email,
			},
		});

		return result;
	}

	async createUser(user: CreateUserRequestDto): Promise<UserResponseDto> {
		const result = await Prisma.user.create({
			data: user,
			select: userSelect,
		});

		return result;
	}
}
