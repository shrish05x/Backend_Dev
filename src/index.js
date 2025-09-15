import dotenv from "dotenv";
import connectDB from "./database/index.js";
dotenv.config({ path: ".env" });


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR: ",error )
        throw error
    })
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`serve is runing at port${process.env.PORT}`)
    })


})
.catch((err)=>{
    console.log(`DATABASE CONNECTION fail !! `,err)
})




