import express from "express";
import mongoose from "mongoose";
import Item from "../models/item";

const router = express.Router();

// GET: /items
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
});

router.post("/", (req, res) => {
  const item = new Item({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  item
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json(item);
    })
    .catch(err => {
      console.log(err);
      res.json({
        err: "error occured"
      });
    });
});

export default router;
