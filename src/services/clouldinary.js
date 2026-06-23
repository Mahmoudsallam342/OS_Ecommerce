import { v2 as cloudinary } from "cloudinary";
import {
  API_KEY,
  API_SECRET,
  CLOUD_NAME,
} from "../../config/config.service.JS";
// cloudinary.uploader
//   .upload("my_image.jpg")
//   .then(result=>console.log(result));

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export default cloudinary;
