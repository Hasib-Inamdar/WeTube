import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Configure INSIDE the function to ensure process.env is ready
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload the file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully: ", response.url);

    // Success! Remove the local file
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);

    // IMPORTANT: Remove the local file even if upload fails
    // to prevent your server from filling up with temp files
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };
