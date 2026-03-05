import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
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

router.route("/login").post(loginUser);

// Secured route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
