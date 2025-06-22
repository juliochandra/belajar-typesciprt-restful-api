import req from "supertest";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { app } from "../src/api/app";
import {
	createUser,
	dataUser,
	deleteUser,
	getUserToken,
} from "./public.util";

describe("POST /user", () => {
	afterEach(async () => {
		await deleteUser();
	});

	it("should reject register new user if request is invalid", async () => {
		const res = await req(app).post("/user").send({
			email: "",
			password: "",
			name: "",
		});

		expect(res.status).toBe(422);
		expect(res.body.errors).toBe(true);
		expect(res.body.success).toBe(false);

		expect(res.body.message).toContain("Validation failed");
		expect(res.body.message).toContain("email");
		expect(res.body.message).toContain("password");
		expect(res.body.message).toContain("name");
	});

	it("should reject register if new user email already exists", async () => {
		await createUser();
		const res = await req(app).post("/user").send(dataUser);

		expect(res.status).toBe(409);
		expect(res.body.success).toBe(false);
		expect(res.body.errors).toBe(true);

		expect(res.body.message).toBe("Email already exists");
	});

	it("should register new user", async () => {
		const res = await req(app).post("/user").send(dataUser);

		expect(res.status).toBe(201);
		expect(res.body.data.user).toBeDefined();
		expect(res.body.data.user).toHaveProperty("id");
		expect(res.body.data.user).toHaveProperty("createdAt");
		expect(res.body.data.user).toHaveProperty("updatedAt");

		expect(res.body.data.user).toMatchObject({
			email: "test@mail.com",
			name: "test name",
		});
	});
});

describe("POST /user/login", () => {
	beforeEach(async () => {
		await createUser();
	});
	afterEach(async () => {
		await deleteUser();
	});

	it("should return 200 and JWT token if login credentials are valid", async () => {
		const res = await req(app).post("/user/login").send({
			email: dataUser.email,
			password: dataUser.password,
		});

		expect(res.status).toBe(200);
		expect(res.body.message).toBe("Success login");
		expect(res.body.success).toBe(true);
		expect(res.body.data.token).toBeDefined();
	});

	it("should return 401 if email or password is wrong", async () => {
		const res = await req(app).post("/user/login").send({
			email: "wrongemail@email.com",
			password: "wrongpassword",
		});

		expect(res.status).toBe(401);
		expect(res.body.errors).toBe(true);
		expect(res.body.message).toBe("Email or Password is wrong");
		expect(res.body.success).toBe(false);
	});

	it("should return 422 if email or password invalid or empty", async () => {
		const res = await req(app).post("/user/login").send({
			email: "Invalid email",
			password: "",
		});

		expect(res.status).toBe(422);
		expect(res.body.errors).toBe(true);
		expect(res.body.message).toContain("Validation failed ");
		expect(res.body.success).toBe(false);
	});
});

describe("GET /user/info", () => {
	beforeEach(async () => {
		await createUser();
	});
	afterEach(async () => {
		await deleteUser();
	});

	it("should return 200 and give info user", async () => {
		const token = await getUserToken();

		const res = await req(app)
			.get("/user/info")
			.set("Cookie", `authorization=${token}`);

		expect(res.status).toBe(200);
		expect(res.body.data).toBeDefined();
	});
});
