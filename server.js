import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import router from "./route/schoolRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
const port = process.env.port
const db = process.env.MONGODB_URI
app.use(express.json())
app.use(router)
app.use(cookieParser())

mongoose.connect(db)
    try{
        console.log('db connected succefully')
        app.listen(port,()=>{
            console.log(`server is running on port ${port} ...`)
        })

    }
    catch(err){
        console.log(err)
    }

