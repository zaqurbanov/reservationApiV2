const express = require('express')

const router = express.Router()
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const authRole = require('../middleware/authRoleMiddleware')
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/',auth,authRole(['admin','manager']),userController.getAllUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
router.get('/:id',auth,authRole(['admin','manager','user']),userController.getUserById)

/**
 * @swagger
 * /user/update-role/{id}:
 *   put:
 *     summary: Update user role by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: manager
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.put('/:id',auth,userController.updateUserById);


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.put('/update-role/:id',auth,authRole(['admin']),userController.updateUserRole)

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.delete('/:id',auth,authRole(['admin']),userController.deleteuserById);
module.exports = router