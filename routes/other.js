const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const attendanceController = require('../controllers/attendanceController');
const backendSettingController = require('../controllers/backendSettingController')

// project routes

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);
router.post('/projects/:projectId/employees/:employeeId', projectController.addEmployeeToProject);
router.delete('/projects/:projectId/employees/:employeeId', projectController.removeEmployeeFromProject);

// task routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.post('/tasks/:id/comments', taskController.addComment);

// attendence routes

router.post('/attendance/checkin', attendanceController.checkIn);
router.post('/attendance/checkout', attendanceController.checkOut);
router.get('/attendance/late', attendanceController.getLateAttendances);
router.get('/attendance/report/:userId', attendanceController.getAttendanceReport);
router.put('/attendance/:id/status', attendanceController.updateAttendanceStatus);

// backend-settings routes

router.put('/settings', backendSettingController.updateSetting);
router.get('/settings', backendSettingController.getSettings);



module.exports = router;
