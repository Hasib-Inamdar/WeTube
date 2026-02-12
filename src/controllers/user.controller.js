import { log } from "console";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  // VALIDATIONS:

  // 1. Check if any field is empty or not
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    // If any one field is empty the it will print error message.
    throw new ApiError(400, "All field are required");
  }

  // 2. Check if user already exist in DB with same username or email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  // 3. File upload avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverimage[0]?.path;
});

export { registerUser };
