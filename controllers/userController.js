const User = require('../models/user');
const Project = require('../models/project');
const Task = require('../models/task');

exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching users.' });
  }
};

exports.getUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.addUser = async function (req, res) {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(200).send({ message: 'User added!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    Object.keys(req.body).forEach((key) => {
      if (key == "role") {
        if (req.user.role == 1) { // Assuming 1 is the role for admin
          user[key] = req.body[key];
        }
      } else {
        user[key] = req.body[key];
      }
    });

    await user.save();
    res.status(200).send({ message: 'User updated!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteUser = async function (req, res) {
  if (req.user.id === req.params.id) {
    return res.status(403).send({ message: 'Admins cannot delete their own account' });
  }

  try {
    await User.findOneAndDelete(req.params.id);
    res.status(200).send({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllEmployees = async function (req, res) {
  try {
    const employees = await User.find({ role: 2 }); // Adjust role value as needed
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employees.' });
  }
};

exports.getEmployeeProjects = async function (req, res) {
  try {
    const projects = await Project.find({ employees: req.params.id }).populate('employees', 'name email');
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employee projects.' });
  }
};

exports.getEmployeeTasks = async function (req, res) {
  try {
    const tasks = await Task.find({ assignedTo: req.params.id }).populate('assignedTo', 'name email').populate('project', 'name');
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employee tasks.' });
  }
};



