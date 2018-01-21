import multer from "multer";
import path from "path";
import mongoose from "mongoose";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "static", "images"));
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
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedTypes.indexOf(file.mimetype) > -1) cb(null, true);
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
