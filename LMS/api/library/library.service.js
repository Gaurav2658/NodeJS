// const dao = require("./library.dao");

// const ALLOWED_TYPES = ["Adventure", "Horror", "Comic", "Nonfiction"];
// const currentYear = new Date().getFullYear();

// const validateBook = (book, isUpdate = false) => {

//   if (!isUpdate || book.author !== undefined) {
//     if (!book.author || typeof book.author !== "string" || !book.author.trim())
//       return "Author must be a non-empty string";
//   }

//   if (!isUpdate || book.title !== undefined) {
//     if (!book.title || typeof book.title !== "string" || !book.title.trim())
//       return "Title must be a non-empty string";
//   }

//   if (!isUpdate || book.year !== undefined) {
//     if (
//       book.year === undefined ||
//       typeof book.year !== "number" ||
//       book.year <= 0 ||
//       book.year > currentYear
//     )
//       return `Year must be between 1 and ${currentYear}`;
//   }

//   if (!isUpdate || book.type !== undefined) {
//     if (!Array.isArray(book.type) || book.type.length === 0)
//       return "Type must be a non-empty array";

//     const invalid = book.type.filter(t => !ALLOWED_TYPES.includes(t));
//     if (invalid.length)
//       return `Invalid book type(s): ${invalid.join(", ")}`;
//   }

//   if (!isUpdate || book.readingStatus !== undefined) {
//     if (typeof book.readingStatus !== "boolean")
//       return "ReadingStatus must be boolean";
//   }
//   return null;
// };

// const createBook = (book) => {
//   const error = validateBook(book, false);
//   if (error) return { error };
//   return { data: dao.insertBook(book) };
// };

// const updateBook = (id, book) => {
//   console.log(book)
//   const error = validateBook(book, true);
//   if (error) return { error };
//   const updated = dao.updateBook(id, book);
//   return updated ? { data: updated } : { notFound: true };
// };

// module.exports = {
//   createBook,
//   updateBook
// };


const dao = require("./library.dao");

const createBook = async (book) => {
  return dao.createBook(book);
};

const updateBook = async (id, book) => {
  const updated = await dao.updateBook(id, book);
  if (!updated) return null;
  return updated;
};

module.exports = {
  createBook,
  updateBook
};
