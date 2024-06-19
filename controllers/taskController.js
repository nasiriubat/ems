const Task = require('../models/task');
const Project = require('../models/project');
const User = require('../models/User');

const createTask = async (req, res) => {
    try {
      const { title, description, priority, assignedTo, project, dueDate } = req.body;
  
      // Ensure the project exists
      const projectExists = await Project.findById(project);
      if (!projectExists) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      const newTask = new Task({
        title,
        description,
        priority,
        assignedTo,
        project,
        dueDate
      });
  
      await newTask.save();
  
      // Add task to the project's tasks array
      projectExists.tasks.push(newTask._id);
      await projectExists.save();
  
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'name email').populate('project', 'name');
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate('assignedTo', 'name email').populate('project', 'name');
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { title, description, priority, status, assignedTo, dueDate } = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, priority, status, assignedTo, dueDate },
        { new: true, runValidators: true }
      ).populate('assignedTo', 'name email').populate('project', 'name');
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Remove the task from the project's tasks array
      await Project.findByIdAndUpdate(task.project, { $pull: { tasks: task._id } });
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const addComment = async (req, res) => {
    try {
      const { comment } = req.body;
      const userId = req.user._id; // Assuming user ID is available from authenticated user
  
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.comments.push({ user: userId, comment });
      await task.save();
  
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    addComment
  };
  

