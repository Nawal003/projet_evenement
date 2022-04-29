const express = require("express");

// require("dotenv").config();

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "20mb", parameterLimit: 20000 })
);
app.use("/api", express.static("public"));

//API headers//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

//Routes//
app.use("/api", require("./routes/evenements"));

//Route to test if API is online//
app.get("/api", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
  console.log("Hello");
});

module.exports = app;
