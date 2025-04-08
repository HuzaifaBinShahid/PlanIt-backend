const express = require("express");
const router = express.Router();

const { getAllTodos, AddTodo, deleteTodo } = require("../controllers/Todo.controller");

router.get("/", getAllTodos)

router.post("/addTodo", AddTodo)

router.delete("/deleteTodo/:id", deleteTodo)

module.exports = router