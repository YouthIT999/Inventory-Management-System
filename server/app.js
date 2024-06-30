const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server ran successfully on ${port}`);
});

console.log("Hello");
console.log("Hello");