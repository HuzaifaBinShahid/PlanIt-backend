const express = require("express");
const router = express.Router();

const {
  getAllTodos,
  AddTodo,
  deleteTodo,
  EditTodo,
  togglePinTodo,
} = require("../controllers/Todo.controller");

router.get("/", getAllTodos);

router.post("/addTodo", AddTodo);

router.put("/editTodo/:id", EditTodo);

router.delete("/deleteTodo/:id", deleteTodo);

router.post("/pinTodo/:id", togglePinTodo);

module.exports = router;
