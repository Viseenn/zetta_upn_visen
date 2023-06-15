const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");
const mongoose = require("mongoose");
const Book = require("./Book");
const Bookshelf = require("./Bookshelf"); 

const app = express();
app.use(bodyParser.json());

// Connect
mongoose
  .connect("mongodb://localhost/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(
  basicAuth({
    users: { admin: "password" },
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

// Create a new book
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific book
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all books with selected fields
app.get("/books/selectedFields", async (req, res) => {
    try {
      const books = await Book.find({}, "title author");
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Get all books with additional field
app.get("/books/withAdditionalField", async (req, res) => {
    try {
      const books = await Book.aggregate([
        {
          $addFields: {
            additionalField: "This is an additional field",
          },
        },
      ]);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});  

// Update a book
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new bookshelf
app.post("/bookshelves", async (req, res) => {
  try {
    const bookshelf = await Bookshelf.create(req.body);
    res.status(201).json(bookshelf);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookshelves
app.get("/bookshelves", async (req, res) => {
  try {
    const bookshelves = await Bookshelf.find().populate("books");
    res.json(bookshelves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific bookshelf by ID
app.get("/bookshelves/:id", async (req, res) => {
  try {
    const bookshelf = await Bookshelf.findById(req.params.id).populate("books");
    if (!bookshelf) {
      return res.status(404).json({ error: "Bookshelf not found" });
    }
    res.json(bookshelf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get list of book genres
app.get("/books/genres", async (req, res) => {
    try {
      const genres = await Book.distinct("genre");
      res.json(genres);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});  

// Update a bookshelf
app.put("/bookshelves/:id", async (req, res) => {
    try {
      const bookshelf = await Bookshelf.findByIdAndUpdate(
        req.params.id,
        { $set: { "books.$[elem].status": req.body.status } },
        { new: true, arrayFilters: [{ "elem._id": req.body.bookId }] }
      );
      if (!bookshelf) {
        return res.status(404).json({ error: "Bookshelf not found" });
      }
      res.json(bookshelf);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});  

// Delete a bookshelf
app.delete("/bookshelves/:id", async (req, res) => {
  try {
    const bookshelf = await Bookshelf.findByIdAndDelete(req.params.id);
    if (!bookshelf) {
      return res.status(404).json({ error: "Bookshelf not found" });
    }
    res.json({ message: "Bookshelf deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookshelves by book ID
app.get("/bookshelves/filter/:bookId", async (req, res) => {
    try {
      const bookshelves = await Bookshelf.find({ books: { $elemMatch: { _id: req.params.bookId } } }).populate("books");
      res.json(bookshelves);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Get bookshelves with each book split
app.get("/bookshelves/unwind", async (req, res) => {
    try {
      const bookshelves = await Bookshelf.aggregate([
        {
          $unwind: "$books",
        },
      ]);
      res.json(bookshelves);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});  

function getUnauthorizedResponse(req) {
  return req.auth ? "Invalid credentials" : "No credentials provided";
}

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
