import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  publishYear: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  sold: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  image: String
});

export default mongoose.model("Item", itemSchema);
