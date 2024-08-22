import { Router } from "express";
import { loggedIn, signUp } from "../controllers/registration.controller.js";
import { checkForCookie } from "../middlewares/authentication.middleware.js";

const userRouter = Router();

// Properly defined routes with leading slashes
userRouter.post("/signup", signUp);
userRouter.get("/login", loggedIn);

// Test route
userRouter.get("/test", checkForCookie, (req, res) => {
  const token = req.user;
  // const token = req.cookies["token"];
  return res.status(200).send({ message: "test route", token: token });
});

export default userRouter;
