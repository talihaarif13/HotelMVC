const express = require("express");
var router = express.Router();

const userController = require("../controllers/user");
const formValidation = require('../validations/formValidation');
const verifyMiddleware = require('../middlewares/verify');

router.post('/signup', formValidation.validate('createUser') ,userController.signup);
router.post('/login', userController.login);
router.get('/fetchReservations', verifyMiddleware.verifyToken, userController.fetchUserReservations);




module.exports = router;
