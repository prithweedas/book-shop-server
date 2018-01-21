import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: v =>
        new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).exec(v),
      message: "{VALUE} is not a valid Email!"
    }
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

userSchema.statics.findByCredencials = async function(email, password) {
  const user = await User.findOne({ email });
  if (!user) return null;
  return (await bcrypt.compare(password, user.password)) ? user : null;
};

userSchema.post("save", (error, doc, next) => {
  if (!error) next();

  if (error.name === "BulkWriteError" && error.code === 11000) {
    error.status = 400;
    error.message = "email address is already in use";
    next(error);
  } else next(error);
});

const User = mongoose.model("User", userSchema);
export default User;
