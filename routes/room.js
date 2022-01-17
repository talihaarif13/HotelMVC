const express = require("express");
var router = express.Router();

const roomController = require('../controllers/room');
const formValidation = require('../validations/formValidation');
const verifyMiddleware = require('../middlewares/verify');

router.post('/', formValidation.validate('createRoom'), verifyMiddleware.verifyToken,roomController.createRoom);
router.get('/', verifyMiddleware.verifyToken, roomController.getHotelRooms);
router.post('/update', formValidation.validate('roomIDValidation'), verifyMiddleware.verifyToken, roomController.updateHotelRoom);

module.exports = router;