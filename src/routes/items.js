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

router.get("/myItems", authenticate, async (req, res, next) => {
  try {
    const result = await Item.find({ owner: req.userId }).exec();
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
    const result = await Item.findById(id)
      .populate("owner")
      .exec();
    res.status(200).json({
      ok: true,
      item: result
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, (req, res, next) => {
  upload(req, res, async err => {
    if (err) {
      next(err);
    } else {
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
        createdAt: Date.now(),
        image: `images/${req.file.filename}`
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
  });
});

router.patch("/:id", authenticate, async (req, res, next) => {
  const id = req.params.id;
  const { name, price, publishYear, author, description, sold } = req.body;
  const updateValues = { name, price, publishYear, author, description, sold };

  // removing undefined or null key
  Object.keys(updateValues).forEach(e => {
    if (updateValues[e] === undefined || updateValues[e] === null)
      delete updateValues[e];
  });

  try {
    const result = await Item.update(
      { _id: id },
      { $set: updateValues }
    ).exec();
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;
