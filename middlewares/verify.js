const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['token'];
    if(!token){
        res.status(400).json({err: 'token required'}); 
        return;
    }
    try{
        const decode = jwt.verify(token, 'secret');
        req.data = decode;
    }catch(err){
        res.status(401).json({err : 'invalid token'});
        return;
    }
    next();
}
module.exports = {
    verifyToken
}