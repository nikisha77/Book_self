import express from "express";
import mongoose from "mongoose";
import mongo_db_url from "./mongo_db_config.js";
import router from "./routes/booksRoutes.js";

const PORT = 5555;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the book club ");
})

app.use('/books', router)

//mongo db connection 
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
