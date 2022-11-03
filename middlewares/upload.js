const path = require("path");
const multer = require("multer");

const { UPLOAD_FILE_SIZE } = process.env;
const tempDir = path.join(__dirname, "../", "./temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: UPLOAD_FILE_SIZE },
});

module.exports = upload;
