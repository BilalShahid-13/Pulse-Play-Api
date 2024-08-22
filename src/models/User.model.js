import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.createTokenForUser = function () {
  const payload = {
    id: this._id,
    fullname: this.fullname,
    email: this.email,
    avatar: this.avatar,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.SECRET_KEY_EXPIRY,
  });
};

userSchema.methods.verifyToken = function () {
  return jwt.decode(token);
};

userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
