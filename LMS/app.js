// const express = require("express");
// const app = express();
// const PORT = 3000;


// app.use(express.json());
// app.use("/", require("./config/router"));
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && 'body' in err) {
//     return res.status(400).send({ status: 400, message: 'Bad Request: Invalid JSON payload' });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const app = express();

app.use(express.json());
app.use("/", require("./config/router"));
app.use(require("./middlewares/error.middleware"));

module.exports = app;

