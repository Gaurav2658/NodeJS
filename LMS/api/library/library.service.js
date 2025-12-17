const dao = require("./library.dao");

const ALLOWED_TYPES = ["Adventure", "Horror", "Comic", "Nonfiction"];

const validateBook = (book) => {
  if(!book.author || !book.title || !book.year || !book.type || !book.readingStatus) return 
  if (typeof book.author !== "string") return "Author must be string"; 
  if (typeof book.title !== "string") return "Title must be string";
  if (typeof book.year !== "number") return "Year must be number";
  if (!Array.isArray(book.type)) return "Type must be array";

  const invalid = book.type.filter(t => !ALLOWED_TYPES.includes(t));
  if (invalid.length) return `Invalid book type(s): ${invalid.join(", ")}. Allowed: ${ALLOWED_TYPES.join(", ")}`;
  if (typeof book.readingStatus !== "boolean")
    return "ReadingStatus must be boolean";

  return null;
};

const createBook = (book) => {
  const error = validateBook(book);
  if (error) return { error };
  return { data: dao.insertBook(book) };
};

const updateBook = (id, book) => {
  const error = validateBook(book);
  if (error) return { error };
  const updated = dao.updateBook(id, book);
  return updated ? { data: updated } : { notFound: true };
};

module.exports = {
  createBook,
  updateBook
};
