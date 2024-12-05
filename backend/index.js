import express from "express";
import mongoose from "mongoose";
import mongo_db_url from "./mongo_db_config.js";
import { Book } from "./models/bookModel.js"; 

const PORT = 5555;
const app = express();

app.use(express.json());

app.post("/books", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).json({ message: "Please provide all the fields" });
        }

        const newBook = await Book.create({ title, author, publishYear });
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


mongoose.connect(mongo_db_url)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`The web server is functional on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); 
    });
