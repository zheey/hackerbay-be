'use strict';
const express = require('express');
const router = express.Router()

const {Image_thumbnail}= require('../controller/image_thumbnail');

/**
 * @api {post} /image-thumbnail/generate Generate Image Thumbnail
 * @apiName Image Thumbnail
 * @apiGroup Protected Routes
 * @apiHeader {String} token  JWT token from successful authentication
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer "+token
 *     }
 *
 *
 * @apiDescription This endpoint downloads an image from a URL and converts it to a thumbnail.
 *
 * The image parameter must be a url.
 *
 *
 * This is a protected route so the token supplied upon successful authentication must be added to the request header.
 *
 * @apiParam {String} image  Mandatory image url.
 *
 * @apiVersion 1.0.0
 *
 * @apiParamExample {json} Request-Example:
 *
 *     {
 *       "image": "http://jevinik.com.ng/images/logo.png"
 *     }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "status": true,
 *           "filepath": "cropped_output.jpg",
 *           "message": "Image reduced successfully"
 *       }
 *
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": false,
 *       "message": "Unable to download. Please make sure the request is an image url."
 *     }
 *
 */

router.post('/generate',  Image_thumbnail);



module.exports = router;