const Todo = require("../models/Todos.model");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (todos.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ message: error.message });
  }
};

const AddTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required" });
    }

    const newTodo = new Todo({
      title,
      description,
      time: new Date(),
    });

    const savedTodo = await newTodo.save();
    return res
      .status(201)
      .json({ message: "Todo created successfully", data: savedTodo });
  } catch (error) {
    console.error("Error in AddTodo:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
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
