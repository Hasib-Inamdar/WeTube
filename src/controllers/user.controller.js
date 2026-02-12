import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required!");
  }

  //  Upload the the image files on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverimage = await uploadOnCloudinary(coverimageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is not uploaded in Cloudinary");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverimage: coverimage?.url || "",
    password,
    email,
    username: username.toLowerCase(),
  });

  // Below line will find the user with respective ID
  // And If present, then it will return all the fields of user but password and refreshtoken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user.");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

export { registerUser };
