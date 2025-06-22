import { Router } from "express";
import { validate } from "../../config/validation";
import { authentication } from "../../middleware/auth.middleware";
import { UserController } from "./controller";
import { UserSchema } from "./schema";

const userController = new UserController();

export const userRouter = Router();

userRouter.get("/", (_req, res) => {
	res.status(200).send("hello");
});

userRouter.post(
	"/",
	validate.body(UserSchema.Register),
	userController.register,
);

userRouter.post(
	"/login",
	validate.body(UserSchema.Login),
	userController.login,
);

userRouter.get("/info", authentication, (req, res) => {
	res.json({
		data: req.user,
	});
});
