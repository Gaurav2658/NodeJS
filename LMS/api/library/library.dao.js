const { error } = require("console");
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

const FILE_PATH = path.join(__dirname, "../../library.json");

const readFile = () => { return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8")); };

const writeFile = (data) => {                                                                                         
  fs.writeFile(FILE_PATH, JSON.stringify(data), (error, data) => {
    if(error) {
      console.error(error)
      return;
    }
    return data.json({status: "success", id: data.length})
  });
};

const getNextId = (books) =>
  books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;

const insertBook = (book) => {
  const data = readFile();
  book.id = getNextId(data.books);
  data.books.push(book);
  writeFile(data);
  return book;
};

const getAllBooks = () => readFile().books;

const getBookById = (id) =>
  readFile().books.find(b => b.id === id);

const updateBook = (id, updatedData) => {
  const data = readFile();
  const index = data.books.findIndex(b => b.id === id);
  if (index === -1) return null;

  data.books[index] = { ...data.books[index], ...updatedData, id };
  writeFile(data);
  return data.books[index];
};

const deleteBook = (id) => {
  const data = readFile();
  const index = data.books.findIndex(b => b.id === id);
  if (index === -1) return false;
  data.books.splice(index, 1);
  writeFile(data);
  return true;
};

module.exports = {
  insertBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
