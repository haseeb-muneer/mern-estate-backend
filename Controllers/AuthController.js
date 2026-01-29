import bcryptjs from "bcryptjs";
import User from "../Model/UserModel.js";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";
export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json({
      success: true,
      msg: "USer is created",
    });
  } catch (error) {
    next(error);
  }
};
export const Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const confirmPassword = bcryptjs.compareSync(password, user.password);
    if (!confirmPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: Date.now() + 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: Date.now() + 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    } else {
      const new_password =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(new_password);
      const user = await User.create({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: Date.now() + 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const Signout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User has been logged out!",
    });
  } catch (error) {
    next(error);
  }
};
