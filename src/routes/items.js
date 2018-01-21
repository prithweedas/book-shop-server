import express from "express";
import mongoose from "mongoose";

import Item from "../models/item";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Item.find().exec();
    res.status(200).json({
      ok: true,
      itemCount: result.length,
      items: result
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Item.findById(id).exec();
    res.status(200).json({
      ok: true,
      item: result
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      error
    });
  }
});

router.post("/", async (req, res) => {
  const { name, price, publishYear, author, description, owner } = req.body;
  const item = new Item({
    _id: mongoose.Types.ObjectId(),
    name,
    publishYear,
    price,
    author,
    description,
    owner
  });
  try {
    const result = await item.save();
    res.status(201).json({
      ok: false,
      item: result
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updateOptions = {};
  Object.keys(req.body).forEach(key => (updateOptions[key] = req.body[key]));
  try {
    const result = await Item.update(
      { _id: id },
      { $set: updateOptions }
    ).exec();
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: flase,
      error
    });
  }
});

export default router;
