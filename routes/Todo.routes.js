const express = require("express");
const router = express.Router();

const {
  getAllTodos,
  AddTodo,
  deleteTodos,
  EditTodo,
  togglePinTodo,
} = require("../controllers/Todo.controller");

router.get("/", getAllTodos);

router.post("/addTodo", AddTodo);

router.put("/editTodo/:id", EditTodo);

router.delete("/deleteTodo/:id", deleteTodos);

router.post("/pinTodo/:id", togglePinTodo);

module.exports = router;
