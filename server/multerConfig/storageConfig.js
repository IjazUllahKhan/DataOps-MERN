import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const fileName = Date.now() + "Image" + file.originalname;
    cb(null, fileName);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only jpg, jpeg or png file"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: filter });

export default upload;
