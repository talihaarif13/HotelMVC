const { validationResult } = require('express-validator');

const roomModel = require('../models').room;
const hotelModel = require('../models').Hotel;

const createRoom = async(req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        let hotel = await hotelModel.findOne({
            where : {
                id : req.body.hotel_id
            }
        });
        if(!hotel){
            res.status(400).json({ error : "hotel does not exists" });
            return;
        }
        let room = await roomModel.create({
            'status': "available",
            "price" : req.body.price
        });
        //create hotel association
        await room.setHotel(hotel);
        res.status(200).json('done');
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
};
const getHotelRooms = async (req,res) => {
    try{
        let hotel_rooms = await roomModel.findAll({
            where: {
                hotel_id : req.body.hotel_id
            }
        });
        res.status(200).json(hotel_rooms);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
        // if(err instanceof ValidationError){
        //     res.status(400).json({'error' : err.errors[0].message})
        // }else{
        //     res.status(500).json({'error' : err });
        // }
    }
};
const updateHotelRoom = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        let update_data = {};
        if(req.body.price){
            update_data.price = req.body.price;
        }
        let room = roomModel.update(update_data, {
            where : {
                id : req.body.room_id
            }
        });
        res.status(200).json(room);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
        // if(err instanceof ValidationError){
        //     res.status(400).json({'error' : err.errors[0].message})
        // }else{
        //     res.status(500).json({'error' : err });
        // }
    }
}

module.exports = {
    createRoom,
    updateHotelRoom,
    getHotelRooms
}