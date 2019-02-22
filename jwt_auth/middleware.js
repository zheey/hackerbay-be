'use strict';
const jwt = require('jsonwebtoken');
const config = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    try {
        if (token && token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        } else {
            return res.status(401).json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }

        if (token) {
            jwt.verify(token, config, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    /*res.status(200).json({
                        message: 'Successful log in',
                        decoded
                    });*/
                    next();
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }catch (e) {
        console.log(e)
    }
};

module.exports = {
    checkToken
}