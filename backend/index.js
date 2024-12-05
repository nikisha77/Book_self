import express from "express";
import mongoose from "mongoose";
import mongo_db_url from "./mongo_db_config.js";


const PORT = 5555
const app = express()

mongoose.connect(mongo_db_url)
.then(()=>{
    console.log("Connected to MongoDB")
    console.log("the web is functional on port ",PORT)
})
.catch((err)=>{
    console.log(err)
    })
