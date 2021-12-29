const serviceModel = require('../models').Service;
const roomServicesModel = require('../models').RoomService;
const roomModel = require('../models').room;

const createService = async (req, res, next) => {
    try{
        let service = await serviceModel.create({
            'name' : req.body.name,
            'description' : req.body.description
        });
        res.status(200).json(service);
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
const addRoomService = async(req, res) => {
    try{
        let room = await roomModel.findByPk(req.body.room_id);
        let service = await serviceModel.findByPk(req.body.service_id);
        if(!room || !service){
            res.status(400).json({error : "not valid data"});
            return;
        }
        const result = await room.addServices(service);
        console.log('res', result);
        res.status(200).json("ok");
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
};
const fetchRoomServices = async(req,res) => {
    try{
        let room_services = await roomModel.findOne({
            where : {
                id:req.body.room_id
            },
            include : serviceModel
        });
        // let room = await roomModel.findByPk(req.body.room_id);
        // let room_services = await room.getServices();
        res.status(200).json(room_services);

    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}
const deleteService = async(req, res) => {
    try{
        let delete_service = await serviceModel.destroy({
            where : {
                id : req.body.service_id
            }
        });
        res.status(200).json(delete_service);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}

module.exports = {
    createService,
    deleteService,
    addRoomService,
    fetchRoomServices
}