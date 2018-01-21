import mongoose, { mongo } from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

export default mongoose.model("Item", itemSchema);
