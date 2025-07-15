require("dotenv").config();
const { User: User } = require("../models/database");
const send = require("../utils/Response");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const existingUser = await User.findOne({
      where: { user_email: user_email },
    });

    if (!existingUser) {
      return send.sendErrorMessage(res, 404, "User not found");
    }

    const verifyPassword = await argon2.verify(
      existingUser.user_password,
      user_password
    );
    if (verifyPassword) {
      const token = jwt.sign(
        {
          id: existingUser.id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return send.sendResponseMessage(
        res,
        200,
        token,
        "User Logged in Successfully!"
      );
    } else {
      return send.sendErrorMessage(res, 401, "Invalid Credentials");
    }
  } catch (error) {
    send.sendErrorMessage(res, 500, error);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    const hash = await argon2.hash(user_password, 10);
    const newUser = await User.create({
      user_name: user_name,
      user_email: user_email,
      user_password: hash,
    });

    send.sendResponseMessage(res, 201, newUser, "User registered successfully");
  } catch (error) {
    return send.sendErrorMessage(res, 500, error);
  }
};
