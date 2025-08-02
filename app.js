const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();

require("dotenv").config();

// CORS 설정 개선
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nodejs-core-shopping-mall-fe.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", indexRouter);

const mongoURI = process.env.MONGODB_URI_PROD;
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(process.env.PORT || 4000, () => {
  console.log("server on");
});
