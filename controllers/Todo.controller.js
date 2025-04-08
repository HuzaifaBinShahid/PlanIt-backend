const Todo = require("../models/Todos.model");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (!todos) {
      res.status(400).json({ message: "No Tasks Found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: "Tile and Description are required" });
    }

    const newTodo = new Todo({
      title,
      description,
      time: new Date(),
    });

    const savedTodo = await newTodo.save();

    res
      .status(201)
      .json({ message: "Todo created successfully", data: savedTodo });
  } catch (error) {
    console.error("Error in AddTodo:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the Todo",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTodos,
  AddTodo,
  deleteTodo,
};
