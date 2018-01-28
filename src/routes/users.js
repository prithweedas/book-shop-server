import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import _ from "lodash";

import User from "../models/user";
import throwNewHttpError from "../common/throwNewHttpError";
import * as jwtHelper from "../common/jwtHelper";

const router = express.Router();

// GET: /users
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await User.findById(id).exec();
    res.status(200).json({
      ok: true,
      user: result
    });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { name, passingYear, password, college, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name,
      passingYear,
      college,
      email,
      password: hashedPassword
    });
    const result = await user.save();
    console.log(result);
    res.status(201).json({
      ok: true,
      user: _.pick(result, ["_id", "email", "name", "college"])
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredencials(email, password);
    if (!user) return next(throwNewHttpError("wrong email or password", 400));

    const result = jwtHelper.generateToken(user);
    const refreshToken = jwtHelper.generateRefreshToken(user);
    res
      .header({
        token: result.token,
        "token-expiresBy": result.TokenExpiresBy,
        refreshToken: refreshToken
      })
      .send({
        ok: true,
        user: _.pick(user, ["_id", "email", "name", "college"])
      });
  } catch (error) {
    next(error);
  }
});

export default router;
