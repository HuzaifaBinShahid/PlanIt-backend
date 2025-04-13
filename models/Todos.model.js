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
    required: false,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  pinnedAt: {
    type: Date,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
