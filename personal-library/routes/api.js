"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

// Connect to database using mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Book Schema for new books
const bookSchema = new Schema({
  title: { type: String, required: true },
  comments: [String],
  commentcount: Number,
});

// Model for library
const Book = mongoose.model("Book", bookSchema);

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      try {
        const books = await Book.find().select("-comments -__v");
        res.json(books);
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    })

    .post(async function (req, res) {
      try {
        const { title } = req.body;
        if (!title) {
          res.send("missing required field title");
          return;
        }
        const newBook = new Book({
          title,
          comments: [],
          commentcount: 0,
        });
        await newBook.save();
        res.json({
          _id: newBook._id,
          title: newBook.title,
        });
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    })

    .delete(async function (req, res) {
      try {
        await Book.deleteMany({});
        res.send("complete delete successful");
      } catch (err) {
        console.log(err);
        res.send("failed to delete " + err);
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      try {
        const { id } = req.params;
        if (!id) {
          res.send("missing required id field");
          return;
        }
        const book = await Book.findById(id).select("-commentcount -__v");
        if (!book) {
          res.send("no book exists");
          return;
        }
        res.json(book);
      } catch (err) {
        console.log(err);
        res.send("no book exists");
      }
    })

    .post(async function (req, res) {
      try {
        const { id } = req.params;
        const { comment } = req.body;
        if (!comment) {
          res.send("missing required field comment");
          return;
        }
        if (!id) {
          res.send("missing required bookId field");
          return;
        }
        const book = await Book.findById(id);
        if (!book) {
          res.send("no book exists");
          return;
        }
        book.comments.push(comment);
        book.commentcount++;
        await book.save();
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
        });
      } catch (err) {
        console.log(err);
        res.send("error updating comments " + err.message);
      }
    })

    .delete(async function (req, res) {
      try {
        const { id } = req.params;
        const book = await Book.findByIdAndRemove(id);
        if (!book) {
          res.send("no book exists");
          return;
        }
        res.send("delete successful");
      } catch (err) {
        console.log(err);
        res.send("no book exists");
      }
    });
};
