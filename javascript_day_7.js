const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");

const app = express();
app.use(bodyParser.json());

app.use(
  basicAuth({
    users: { admin: "password" },
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

const booksSet = new Set();
const booksMap = new Map();

app.post("/purchase", async (req, res) => {
  const { books } = req.body;

  // Add books to Set and Map
  books.forEach((book) => {
    booksSet.add(book.title);
    booksMap.set(book.title, book.author);
  });

  const response = {
    message: "Books added to Set and Map successfully",
  };

  res.json(response);
});

app.get("/buku", (req, res) => {
  const booksSetArray = Array.from(booksSet);
  const booksMapArray = Array.from(booksMap);

  const response = {
    booksSet: booksSetArray,
    booksMap: booksMapArray,
  };

  res.json(response);
});

function getUnauthorizedResponse(req) {
  return req.auth ? "Invalid credentials" : "No credentials provided";
}

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
