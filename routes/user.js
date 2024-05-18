const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin, isEmployee, isSelfOrAdmin } = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get a list of users
 *     description: Only admins can retrieve the list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', isAdmin, userController.getUsers);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Logged in users can fetch only their own user information. Admins can fetch other users.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', isSelfOrAdmin, userController.getUser);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Add a new user
 *     description: Only admins can add a new user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', isAdmin, userController.addUser);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update a user
 *     description: Logged in users can update only their own user information. Admins can update other users.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put('/:id', isSelfOrAdmin, userController.updateUser);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Only admins can delete a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted!
 */
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;
