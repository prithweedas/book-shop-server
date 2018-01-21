import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  passingYear: {
    type: String,
    required: true
  },
  college: {
    type: String,
    default: "Brainware"
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model("User", userSchema);
