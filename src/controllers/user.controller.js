import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiError } from "../utilities/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadcloudinary } from "../utilities/cloudinary.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body
    console.log("email: ", email);

    // if(fullName===""){
    //     throw new ApiError(400, "fullName is required")
    // } or we can use this blew code othewise we need to write many jf else:::

    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "all field are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]

    })
    if (existedUser) {
        throw new ApiError(409, " user with username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImageLocalPath[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, " Avatar file is Required")
    }

    const avatar = await uploadcloudinary(avatarLocalPath)
    const coverImage = await uploadcloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, " avater is not uploadend in server")

    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url | "",
        email,
        password,
        username: username.toLowercase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" 
    )

    if(!createdUser){
    throw new ApiError(500, "something went wronge while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register successfull")
    )


})

export {
    registerUser,

}