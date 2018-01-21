import multer from "multer";

const upload = multer({ dest: "../static/images" });

export default upload;
