import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/api/app";

describe("GET /", () => {
	it("should return hello world sekai", async () => {
		const response = await request(app).get("/");

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			data: null,
			success: true,
			message: "hello world sekai",
		});
	});
});
