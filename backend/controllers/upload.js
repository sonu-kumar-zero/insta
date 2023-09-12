import ImageModel from "../models/Image.js";
import base64 from "base64-js";

// upload an image
export const imageUpload = async (req, res) => {
  try {
    const file = req.file;
    const { imageId } = req.body;

    const imageBuffer = file.buffer;
    const base64image = base64.fromByteArray(imageBuffer);
    const doc = { image: base64image, imageId: imageId };

    const result = await ImageModel.create(doc);
    console.log({ message: "image created successfully", result: result });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get image
export const getImage = async (req, res) => {
  console.log("image fectch");
  // console.log(`Image ${imageId}`);
  try {
    const imageId = req.params.id;
    const result = await ImageModel.find({ imageId: imageId });
    // console.log({ result: result });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// delete the image
export const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const result = await ImageModel.findAndDelete(imageId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
