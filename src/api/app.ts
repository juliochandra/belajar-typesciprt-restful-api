import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import { corsConfig } from "../config/cors";
import { env } from "../config/env";
import { rateLimiter } from "../config/rateLimiter";
import { swaggerConfig } from "../config/swagger";
import { NotFoundException } from "../error/Errors";
import { errorMiddleware } from "../middleware/error.middleware";
import { userRouter } from "./public/router";

export const app = express();

app.disable("x-powered-by");
app.use(rateLimiter);
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === "development") {
	swaggerConfig(app);
	app.use(morgan("dev"));
	// console.log(env);
}

app.get("/", (_req, res) => {
	res.status(200).json({
		data: null,
		message: "hello world sekai",
		success: true,
	});
});

app.use("/user", userRouter);

app.use((req) => {
	const endpoint = req.originalUrl;
	throw new NotFoundException(`${endpoint} url not found!`);
});

app.use(errorMiddleware);
