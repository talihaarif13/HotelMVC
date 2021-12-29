const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservation');
const verifyMiddleware = require('../middlewares/verify');

router.post('/', verifyMiddleware.verifyToken, reservationController.createReservation);
router.put('/', verifyMiddleware.verifyToken, reservationController.updateReservation);
router.delete('/deleteReservation', verifyMiddleware.verifyToken, reservationController.deleteUserAllReservation);
router.delete('/deleteSpecific', verifyMiddleware.verifyToken, reservationController.deleteSpecificRoomReservation);

module.exports = router;