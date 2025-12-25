const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    type: {
      type: [String],
      enum: ["Adventure", "Horror", "Comic", "Nonfiction"],
      required: true
    },
    readingStatus: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", LibrarySchema, "LibraryData");
