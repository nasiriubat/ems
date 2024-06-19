const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin, isEmployee, isSelfOrAdmin } = require('../middleware/roleMiddleware');


router.get('/', isAdmin, userController.getUsers);
router.get('/:id', isSelfOrAdmin, userController.getUser);
router.post('/', isAdmin, userController.addUser);
router.put('/:id', isSelfOrAdmin, userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);

router.get('/employees', userController.getAllEmployees);
router.get('/employees/:id/projects', userController.getEmployeeProjects);
router.get('/employees/:id/tasks', userController.getEmployeeTasks);

module.exports = router;
