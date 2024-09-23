const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const cloudinary = require("../server/utils/cloudinary");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send("error");
    } else {
      res.status(200).send("file uploaded");
      console.log(result);
      console.log(req.body);
      console.log(req.file);
    }
  });
});

app.listen(3001, () => {
  console.log("server is running ");
});
