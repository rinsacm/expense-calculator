const express = require("express");
const app = express();
const cors = require("cors");
const { urlencoded } = require("express");
const PORT = 3001;
let indexRouter = require("./routes/index");
let dbconnect = require("./config/dbconfig");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let corsOptins = {
  origin: "http://localhost:3000",
  crossOrigin: true,
  credentials: true,
};
app.use(cors(corsOptins));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log("listening at " + PORT + " ...");
});

dbconnect.connect();
