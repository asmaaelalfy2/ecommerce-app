var express = require('express');
var multer = require('multer');
const path = require('path');
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    return cb('Images only ');
  }
};
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), function (req, res, next) {
  // req.body contains the text fields
  res.send(`/${req.file.path}`);
});

module.exports = router;
