const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const peopleSchema = new Schema({
  fname: { type: String, required: true },
  lname: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: Number,
  date: { type: Date, default: Date.now },
  favFoods: [
    {
      type: String,
    },
  ],
  //   favFoods:[]
});

const People = mongoose.model("People", peopleSchema);
module.exports = People;
