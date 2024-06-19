const Project = require('../models/project');
const User = require('../models/user');
const Task = require('../models/task');

exports.createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, employees } = req.body;

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      employees
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('employees', 'name email');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('employees', 'name email')
      .populate({
        path: 'tasks',
        populate: {
          path: 'assignedTo',
          select: 'name email'
        }
      });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, employees } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, startDate, endDate, employees },
      { new: true, runValidators: true }
    ).populate('employees', 'name email');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Optionally, you can also delete all tasks associated with the project
    await Task.deleteMany({ project: project._id });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addEmployeeToProject = async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (!project.employees.includes(employeeId)) {
      project.employees.push(employeeId);
      await project.save();
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.removeEmployeeFromProject = async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.employees.includes(employeeId)) {
      project.employees = project.employees.filter(id => id.toString() !== employeeId);
      await project.save();
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectEmployees = async (projectId) => {
  try {
    const project = await Project.findById(projectId).populate('employees', 'name email');
    return project.employees;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching project employees');
  }
};
exports.getProjectTasks = async (projectId) => {
  try {
    const project = await Project.findById(projectId).populate({
      path: 'tasks',
      populate: {
        path: 'assignedTo',
        select: 'name email'
      }
    });
    return project.tasks;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching project tasks');
  }
};



