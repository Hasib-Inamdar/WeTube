import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null; // If there is no localfile then return null

    //Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // If file is uploaded
    console.log("File has been uploaded successfully ", response.url);
    return response;
  } catch (error) {
    console.log("Error: ", error);
    console.error("Cant upload data to cloudinary");
    fs.unlinkSync(localFilePath); //Remove the locally saved file if upload operation failed
    return null;
    //
  }
};

export { uploadOnCloudinary };
