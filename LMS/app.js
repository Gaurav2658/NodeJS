const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./config/router"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
