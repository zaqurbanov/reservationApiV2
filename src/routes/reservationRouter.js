const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');
const auth = require('../middleware/auth');
const addReservationValidation = require('../validations/addReservationValidation');
const authRole = require('../middleware/authRoleMiddleware');


// butun reservationlara yalniz admin baxa bilir.
router.get('/', auth, authRole('admin'),reservationController.getAllReservation)

// yeni reservasiya yaratmaq ucun update validasiyasindan kecir. 
/**
 * @swagger
 * /reserve:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               date:
 *                 type: string
 *                 example: 2024-10-10
 *               time:
 *                 type: string
 *                 example: 19:00
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', addReservationValidation, auth,reservationController.addReservation)

/**
 * @swagger
 * /reserve:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reservations
 *       403:
 *         description: Access denied
 */
router.get('/:id',auth,reservationController.getReservationById)

/**
 * @swagger
 * /reserve/{id}:
 *   put:
 *     summary: Update reservation by ID
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Reservation Name
 *               date:
 *                 type: string
 *                 example: 2024-10-15
 *               time:
 *                 type: string
 *                 example: 18:00
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Reservation not found
 */
router.put('/:id',auth,reservationController.updateReservationById);

/**
 * @swagger
 * /reserve/{id}:
 *   delete:
 *     summary: Delete reservation by ID
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Reservation not found
 */
router.delete('/:id',auth,reservationController.deleteReservationById)

module.exports = router