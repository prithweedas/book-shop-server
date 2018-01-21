import express from "express";

const router = express.Router();

// GET: /items
router.get("/", (req, res, next) => {
  res.send(["item1", "item2", "item3"]);
});

export default router;
