import express from "express";
import multer from "multer";
import { deleteImage, getImage, imageUpload } from "../controllers/upload.js";

const upload = multer();
const router = express.Router();

// upload an image
router.post("/image", upload.single("image"), imageUpload);
// get the image
router.get("/image/:id", getImage);
// delete the image
router.delete("/image/:id",deleteImage);


export default router;
