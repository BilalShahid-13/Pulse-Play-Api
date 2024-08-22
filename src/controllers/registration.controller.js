import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";

const options = {
  httpOnly: true,
  secure: true,
};

const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(409).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  if (fullname && email && hashedPassword) {
    try {
      const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
      });
      if (user) {
        const token = await user.createTokenForUser();
        return res
          .cookie("token", token, options)
          .status(201)
          .json({ message: "user created successfully", user });
      }
    } catch (error) {
      console.error("user registration error", error);
    }
  }
};

const loggedIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "invalid email" });
      }
      const isPasswordCorrect = await user.isPasswordCorrect(password);
      if (!isPasswordCorrect) {
        return res.status(401).send({ message: "invalid password" });
      }
      const token = await user.createTokenForUser();
      return res
        .cookie("token", token)
        .status(200)
        .send({ message: "user logged in successfully", token });
    } catch (error) {
      console.error("logged error", error);
      return res.status(500).json({ message: "loggedin error", error });
    }

};

export { signUp, loggedIn };
