const express = require("express");
const logger = require("morgan");
const Mongoose = require("mongoose");


const PORT = 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes"));

Mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

app.listen(PORT, () => {
    console.log("app runing on http://localhost:"+PORT);
})