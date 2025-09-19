import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
      const uploadcloudinary = async (localFilePath)=>{
        try {
            if(!localFilePath){
                return null
            }
            const response= await cloudinary.v2.uploader.upload(localFilePath,{ resource_type: "auto"  
            })
            console.log("file uploaded successfully")
            
            return response
        } catch (error) {
            fs.unlinkSync(localFilePath) // to removelocally saveed file
            return null
        }
      }
     export {uploadcloudinary}