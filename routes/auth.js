'use strict';
const express = require('express');
const router = express.Router()
const {login}= require('../controller/auth');

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiDescription This endpoint authenticates user and returns a token.
 *
 * @apiParam {String} username  Mandatory username.
 * @apiParam {String} password     Mandatory password.
 * @apiVersion 1.0.0
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *
 *       "username":"Zainab",
 *       "password":"somepassword"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {

            "success": true,
            "message": "Authentication successful!",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InphaW5hYiIsImlhdCI6MTU1MDY5NTM4NCwiZXhwIjoxNTUwNzgxNzg0fQ.EDR_gRcmikcxGpNxoMk4ZjQt3RT00c7fR3gH0ZkGEt8"
        }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       success: false,
 *       message: 'Authentication failed! username or password missing.
 *     }
 *
 */

router.post('/login',  login);


module.exports = router;