import express from "express";
import mongoose from "mongoose";

import Item from "../models/item";
import authenticate from "../common/authenticate";
import upload from "../common/multer";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Item.find().exec();
    res.status(200).json({
      ok: true,
      itemCount: result.length,
      items: result
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Item.findById(id).exec();
    res.status(200).json({
      ok: true,
      item: result
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authenticate,
  upload.single("image"),
  async (req, res, next) => {
    const {
      id,
      name,
      price,
      publishYear,
      author,
      description,
      fileName
    } = req.body;
    
    const item = new Item({
      _id: id,
      name,
      publishYear,
      price,
      author,
      description,
      owner: req.userId,
      image: `images/${fileName}`
    });
    try {
      const result = await item.save();
      res.status(201).json({
        ok: true,
        item: result
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id", authenticate, async (req, res, next) => {
  const id = req.params.id;
  const { sold } = req.body;
  try {
    await Item.update({ _id: id }, { $set: { sold } }).exec();
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;
