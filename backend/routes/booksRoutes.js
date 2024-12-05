import { Router } from 'express';
import { Book } from '../models/bookModel.js';

const router = Router();



// route to add a book
router.post("/", async (req, res) => {
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

// route to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            total_books: books.length,
            data: books
        })
    }
    catch (err) {
        res.status(500).send("Cannot view books now !! ", err)

    }
})

// route to get a book by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const req_book = await book.findById(id)
        return res.status(200).json(req_book)
    }
    catch (err) {
        return res.status(404).send("Given ID does not exist !!")
    }
})

// route to update a book
router.put('/:id', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).json({ message: "Please provide all the fields" })
        }
        const id = req.params.id;
        const updated_book = await Book.findByIdAndUpdate(id, req.body)

        if (!updated_book) {
            return res.status(404).json({ message: "Given ID does not exist" })
        }
        return res.status(200).json(updated_book)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// route to delete a book
router.delete('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const deleted_book = Book.findByIdAndDelete(id)
        if (!deleted_book) {
            return res.status(404).json({ message: "Given book  id  does not exist" })
        }
        return res.status(200).json({ message: "Book deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router;
