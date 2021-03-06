const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    //console.log('x-auth-token: ',req.header('x-auth-token'));
    // Check token
    if(!token) return res.status(401).json({msg: 'No token, authorization denied' });
    
    try{
        // Verify token
        const decoded = jwt.verify(token, config.get('jwt.jwtSecret'));

        // Add user from payload
        req.user = decoded;
        next();    
    }catch (e) {
        res.status(400).json({msg: 'Token is not valid' });
    }
}

module.exports = auth;