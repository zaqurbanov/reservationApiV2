const express = require('express');
const router = express.Router();
const reservationRouter = require('./reservationRouter')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
// const adminRouter = require('./adminRouter')


router.use('/auth',authRouter)
router.use('/reserve',reservationRouter)
router.use('/user',userRouter)
// router.use('/admin',adminRouter)
module.exports = router