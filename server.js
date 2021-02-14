const express = require("express");
const logger = require("morgan");
const Mongoose = require("mongoose");

const PORT = 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

Mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
  });

app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes"));

app.listen(PORT, () => {
    console.log("app runing on http://localhost:"+PORT);
})