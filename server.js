const express = require('express')
const app = express()
const mongoose = require("mongoose");
require('dotenv').config();
const auth = require("./middleware/auth");

const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


let user = require('./routers/user.js');
let article = require('./routers/article.js');
let category = require('./routers/category.js');
app.use('/user', user);
app.use('/article',auth, article);
app.use('/category',auth, category);

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome !!!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})