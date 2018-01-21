import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/user";

const router = express.Router();

// GET: /items
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
      user: result
    });
  } catch (error) {
   next(error);
  }
});

export default router;
