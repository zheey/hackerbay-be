'use strict';
let jwt = require('jsonwebtoken');
let config = process.env.JWT_SECRET;

const login = (req, res)=> {
        let username = req.body.username;
        let password = req.body.password;

        try {

            if (username && password) {

                let token = jwt.sign({username: username},
                    config,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                res.status(200).json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Authentication failed! username or password missing.'
                });
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Unable to complete request.'
            })
        }
};


module.exports={
    login
}