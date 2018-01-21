import multer from "multer";
import path from "path";
import mongoose from "mongoose";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "static", "images"));
  },
  filename: (req, file, cb) => {
    const id = mongoose.Types.ObjectId();
    req.body.id = id;
    const fileName = id + file.originalname.replace(/ /g, "_");
    req.body.fileName = fileName;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cd(null, false);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

export default upload;
