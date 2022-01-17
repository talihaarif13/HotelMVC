const express = require('express');
const app = express()
var bodyParser = require("body-parser");

//swagger file
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//routes import
const hotelRoutes = require('./routes/hotel');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const reservationRoutes = require('./routes/reservation');
const serviceRoutes = require('./routes/services');

//cors
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

//make uploads folder static to access photos
app.use('/uploads', express.static('uploads'));

//parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use('/hotel', hotelRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/reservation', reservationRoutes);
app.use('/services', serviceRoutes);


//zip files
const multer = require('multer');
const path = require('path');
const admzip = require('adm-zip');

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

app.post("/file/zip", upload.array("documents", 5), (req, res) => {
    var zip = new admzip();
    var outputFilePath = Date.now() + "output.zip";
    if (req.files) {
        req.files.forEach((file) => {
            console.log(file.path)
            zip.addLocalFile(file.path)
        });
        var willSendthis = zip.toBuffer();
        // or write everything to disk
        zip.writeZip(outputFilePath);
        res.status(200).send("ok");
    }
});


 

app.listen(3000, () => {
    console.log("app listening on 3000");
})