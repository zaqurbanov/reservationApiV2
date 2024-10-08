// const express = require('express');
// const adminMiddleware = require('../middleware/adminMiddleware');
// const reservationController = require('../controller/reservationController');
// const auth = require('../middleware/auth');
// const authRole = require('../middleware/authRoleMiddleware');
// const router = express.Router();

// router.get('/reserve',auth,authRole('admin'), reservationController.getAllReservation)
// router.get('/reserve/:id',auth,reservationController.getReservationById)
// router.delete('/reserve/:id',auth,reservationController.deleteReservationById)

// module.exports = router