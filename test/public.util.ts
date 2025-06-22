import bcrypt from "bcrypt";
import type { User } from "@prisma/client";
import { Prisma } from "../src/config/database";
import { createToken } from "../src/config/createToken";

export const dataUser = {
	email: "test@mail.com",
	password: "testpassword",
	name: "test name",
};

export const deleteUser = async (): Promise<void> => {
	await Prisma.user.deleteMany();
};

export const createUser = async (): Promise<User> => {
	const hashedPassword = await bcrypt.hash(dataUser.password, 10);

	const result = await Prisma.user.create({
		data: {
			...dataUser,
			password: hashedPassword,
		},
	});

	return result;
};

export const findUser = async (): Promise<User | null> => {
	const user = await Prisma.user.findUnique({
		where: {
			email: dataUser.email,
		},
	});

	return user;
};

export const getUserToken = async (): Promise<string | null> => {
	const user = await findUser();
	if (!user) {
		return null;
	}
	const token = createToken({ id: user.id });
	return token;
};
