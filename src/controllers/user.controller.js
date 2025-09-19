import { asyncHandler } from "../utilities/asyncHandler.js";

const registerUser = asyncHandler( async (req , res  )=> {
    return res.status(200).json({
        massage: "api is working ... thank's to creater 'shrish'"
    })
})

export { registerUser}