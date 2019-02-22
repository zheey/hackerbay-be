'use strict';
const express = require('express');
const router = express.Router()

const {ApplyPatch}= require('../controller/json-patching');

/**
 * @api {post} /json-patching/parse Generate JSON Patching
 * @apiName JSON Patching
 * @apiGroup Protected Routes
 * @apiHeader {String} token  JWT token from successful authentication
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer "+token
 *     }
 *
 * @apiDescription This endpoint modifies a json object using json_parse_object and returns a new object.
 *
 * The json_parse_object can either be a Object or an array of Objects.
 *
 *
 * This is a protected route so the token supplied upon successful authentication must be added to the request header.
 *
 * @apiParam {Object} json_object  Mandatory json object.
 * @apiParam {Object} json_parse_object     Mandatory json patch object.
 * @apiVersion 1.0.0
 *
 * @apiParamExample {json} Request-Example:
 *
 *     {
 *       "json_object": { "firstName": "Zainab", "contactDetails": { "phoneNumbers": [] }},
 *       "json_parse_object":{ "op": "add", "path": "/lastName", "value": "Adegoke" }
 *     }
 *
 *     or
 *     {
 *      "json_object": { "firstName": "Zainab", "contactDetails": { "phoneNumbers": [] }},
 *      "json_parse_object"	 : [
 *          { "op": "replace", "path": "/firstName", "value": "Olaitan" },
 *          { "op": "add", "path": "/lastName", "value": "Adegoke" },
 *          { "op": "add", "path": "/contactDetails/phoneNumbers/0", "value": { "number": "555-123" }  }
 *        ]
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "Data has been parsed. ",
 *           "data": {
 *               "firstName": "Zainab",
 *               "contactDetails": {
 *                   "phoneNumbers": [
 *                       {
 *                           "number": "555-123"
 *                       }
 *                   ]
 *                },
 *               "lastName": "Adegoke"
 *           }
 *       }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "success": false,
 *       "message": "Missing object. Either the document object or the patch object is missing.".
 *     }
 *
 */


router.post('/parse',  ApplyPatch);



module.exports = router;