const Todo = require("../models/Todos.model");

const getAllTodos = async (req, res) => {
  try {
    const searchKey = req.query.searchKey || "";

    const filteredTodos = await Todo.find({
      title: { $regex: searchKey, $options: "i" },
    })
      .sort({ isPinned: -1, pinnedAt: -1 })
      .exec();

    return res.status(200).json(filteredTodos);
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

const EditTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, time: new Date() },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Error in EditTodo:", error);
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

const togglePinTodo = async(req,res) =>{
  try {
    const {id} = req.params;
    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const isPinned = !todo.isPinned;
    todo.isPinned = isPinned;
    todo.pinnedAt = isPinned ? new Date() : null;

    await todo.save();
    return res.status(200).json({message: "Todo Pinned Successfully!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An Error occured while pinning todo"});
  }
}

module.exports = {
  getAllTodos,
  AddTodo,
  EditTodo,
  deleteTodo,
  togglePinTodo
};
