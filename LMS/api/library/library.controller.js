const service = require("./library.service");
const dao = require("./library.dao");

const addBook = (req, res) => {
    
  const result = service.createBook(req.body);
  if (result.error)
    return res.status(400).json({ success: false, message: result.error });

  res.status(201).json({ success: true, data: result.data });
};

const getBooks = (req, res) => res.json({ success: true, data: dao.getAllBooks() });

const getBook = (req, res) => {
  const book = dao.getBookById(Number(req.params.id));
  if (!book)
    return res.status(404).json({ success: false, message: "No record found" });
  res.json({ success: true, data: book });
};

const updateBook = (req, res) => {
  const result = service.updateBook(Number(req.params.id), req.body);
  if (result.notFound)
    return res.status(404).json({ success: false, message: "Book not found" });

  if (result.error)
    return res.status(400).json({ success: false, message: result.error });

  res.json({ success: true, data: result.data });
};

const deleteBook = (req, res) => {
  const deleted = dao.deleteBook(Number(req.params.id));
  if (!deleted)
    return res.status(404).json({ success: false, message: "Book not found" });

  res.json({ success: true, message: "Book deleted successfully" });
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
};
