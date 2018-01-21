import mongoose, { mongo } from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  publishYear: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Item", itemSchema);
