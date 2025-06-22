import bcrypt from "bcrypt";
import { createToken } from "../../config/createToken";
import { validate } from "../../config/validation";
import {
	ConflictException,
	UnauthorizedException,
} from "../../error/Errors";
import { UserRepository } from "./repository";
import type {
	CreateUserRequestDto,
	LoginUserRequestDto,
	UserResponseDto,
} from "./schema";
import { UserSchema } from "./schema";

const userRepository = new UserRepository();
export class UserService {
	async register(request: CreateUserRequestDto): Promise<UserResponseDto> {
		const isEmailExist = await userRepository.findEmail(request.email);

		if (isEmailExist) {
			throw new ConflictException("Email already exists");
		}

		const hashedPassword = await bcrypt.hash(request.password, 10);

		const result = await userRepository.createUser({
			...request,
			password: hashedPassword,
		});

		const response = validate.response(UserSchema.UserResponse, result);

		return response;
	}

	async login(request: LoginUserRequestDto): Promise<string> {
		const isEmailExist = await userRepository.findEmail(request.email);

		if (!isEmailExist) {
			throw new UnauthorizedException("Email or Password is wrong");
		}

		const isPasswordValid = await bcrypt.compare(
			request.password,
			isEmailExist.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException("Email or Password is wrong");
		}

		const token = createToken({ id: isEmailExist.id });

		return token;
	}
}
