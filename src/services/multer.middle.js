import multer from "multer";
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = nanoid() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export const multerMiddleware = upload.single("category");
