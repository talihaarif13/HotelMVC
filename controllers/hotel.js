const hotelModel = require('../models').Hotel;
const {ValidationError} = require('sequelize');

const createHotel = async (req, res, next) => {
    try{
        console.log('com2');
        console.log(req.file);
        let hotel = await hotelModel.create({
            name : req.body.name,
            address : req.body.address,
            picture : req.file.path
        });
        res.status(200).json(hotel);
    }catch(err){
        console.log(err);
        if(err instanceof ValidationError){
            res.status(400).json({'error' : err.errors[0].message})
        }else{
            res.status(500).json({'error' : err });
        }
    }
}
const updateHotel = async (req, res) => {
    try{
        console.log('com2');
        let update_data = {};
        if(req.body.name){
            update_data.name = req.body.name;
        }
        if(req.body.address){
            update_data.address = req.body.address;
        }
        let hotel = await hotelModel.update(update_data, {
            where : {
                id : req.body.id
            }
        });
        res.status(200).json(hotel);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}
const deleteHotel = async (req, res) => {
    try{
        let hotel = await hotelModel.destroy({
            where: {
              id: req.body.id
            }
        });
        res.status(200).json(hotel);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}
const fetchHotels = async (req,res) => {
    try{
        let all_hotels = await hotelModel.findAll();
        res.status(200).json(all_hotels);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}



module.exports = {
    createHotel, 
    updateHotel,
    deleteHotel,
    fetchHotels
}



