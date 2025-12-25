// const express = require("express");
// const router = express.Router();
// const controller = require("./library.controller");

// router.post("/books", controller.addBook);
// router.get("/books", controller.getBooks);
// router.get("/books/:id", controller.getBook);
// router.put("/books/:id", controller.updateBook);
// router.delete("/books/:id", controller.deleteBook);

// module.exports = router;


const express = require("express");
const router = express.Router();
const controller = require("./library.controller");

router.post("/books", controller.addBook);
router.get("/books", controller.getBooks);
router.get("/books/:id", controller.getBook);
router.put("/books/:id", controller.updateBook);
router.delete("/books/:id", controller.deleteBook);

module.exports = router;