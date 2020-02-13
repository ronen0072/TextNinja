const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');

    // Check token
    if(!token){
        res.status(401).json({msg: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token,config.get('jwt.jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
}