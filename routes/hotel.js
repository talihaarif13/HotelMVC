const express = require("express");
var router = express.Router();
const multer = require('multer');
const path = require('path');

const hotelController = require("../controllers/hotel");
const verifyMiddleware = require('../middlewares/verify');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage});

router.post("/", verifyMiddleware.verifyToken, upload.single('picture') , hotelController.createHotel);
router.put("/", verifyMiddleware.verifyToken, hotelController.updateHotel);
router.post("/delete", verifyMiddleware.verifyToken, hotelController.deleteHotel);
router.get("/", verifyMiddleware.verifyToken , hotelController.fetchHotels);

module.exports = router;
