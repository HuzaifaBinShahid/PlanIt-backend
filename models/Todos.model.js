const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Requierd"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  time: {
    type: Date,
    required: false
  }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
