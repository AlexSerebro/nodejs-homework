const multer = require("multer");
const path = require("path");

const multerConfig = multer.diskStorage({
  destination: (req, res, cb) => {},
});
