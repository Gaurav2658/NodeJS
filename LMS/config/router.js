const express = require("express");
const router = express.Router();

router.use("/library", require("../api/library/library.router"));

module.exports = router;
