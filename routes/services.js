const express = require("express");
var router = express.Router();

const serviceController = require("../controllers/services");
const verifyMiddleware = require('../middlewares/verify');


router.post("/", verifyMiddleware.verifyToken, serviceController.createService);
router.post('/addService', verifyMiddleware.verifyToken, serviceController.addRoomService);
router.get('/', verifyMiddleware.verifyToken, serviceController.fetchRoomServices);
router.delete('/', verifyMiddleware.verifyToken, serviceController.deleteService);

module.exports = router;
