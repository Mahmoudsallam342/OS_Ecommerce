import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";
const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
// export const multerMiddle = (customPath) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const fullPath = path.resolve(`uploads/${customPath}`);
//       if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath, { recursive: true });
//       }
//       cb(null, fullPath);
//     },
//     filename: function (req, file, cb) {
//       const uniqueName = nanoid() + "-" + file.originalname;
//       cb(null, uniqueName);
//     },
//   });
//   const fileFilter = function (req, file, cb) {
//     const imagesTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "image/webp",
//       "image/gif",
//       "image/svg+xml",
//     ];
//     if (imagesTypes.includes(file.mimetype)) {
//       return cb(null, true);
//     }
//     cb(new Error("unvalid file extention"), false);
//   };
//   return multer({ storage, fileFilter });
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fullPath = path.resolve(`uploads/${customPath}`);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },
});
export const upload = multer({
  storage,
});
// export const fileMulterMiddle = (customPath) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const fullPath = path.resolve(`uploads/${customPath}`);
//       if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath, { recursive: true });
//       }
//       cb(null, fullPath);
//     },
//     filename: function (req, file, cb) {
//       const uniqueName = nanoid() + "-" + file.originalname;
//       cb(null, uniqueName);
//     },
//   });
//   const fileFilter = function (req, file, cb) {
//     if (allowedTypes.includes()) {
//       return cb(null, true);
//     }
//     cb(new Error("unvalid file extention"), false);
//   };
//   return multer({ storage, fileFilter });
// };
