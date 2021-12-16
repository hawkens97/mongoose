const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config();

/* connect DB to server */
mongoose.connect(
  process.env.mongo_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    else console.log("DB is connected");
  }
);
app.use("/peoples", require("./routes/peopleRoutes"));
/* create server */
app.listen(5002, (err) => {
  if (err) console.log(err);
  else console.log("Server running on port 5002");
});
