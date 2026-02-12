import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(
  // Middleware for uploading fiels
  upload.fields([
    {
      name: "avatar", // Should be same in frontend
      maxCount: 1,
    },
    {
      name: "coverimage", // Should be same in frontend
      maxCount: 1,
    },
  ]),
  registerUser,
);

export default router;
