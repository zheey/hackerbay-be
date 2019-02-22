'use strict';

const fs = require('fs'),
    request = require('request');
const path = require('path');
const imagePath = path.join(__dirname + '../../download.png');
const outputImageName = 'cropped_output.jpg';
const outputImagePath = __dirname + '../../public/images/' + outputImageName;
const sharp = require('sharp')

const Image_thumbnail = (req, res, next) => {
    try {

        const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        if(!pattern.test(req.body.image)) {
            res.status(400).json({
                status: false,
                message: "Please enter a valid URL."
            })
        } else {
            //separate the url by '/'
            let urlArray = req.body.image.split("/");

            //separate the url by '.' and get the last item in the array which is the image type
            let fileType = urlArray[urlArray.length - 1].split(".")

            let types = ["png", "jpeg", "jpg"]

            if(types.includes(fileType[fileType.length - 1].toLowerCase())){

            //download image and save as download.png
            download(req.body.image, 'download.png', function () {
                sharp(imagePath)
                    .resize(50, 50, {fit: "cover"})
                    .toFile(outputImagePath)
                    .then((ImageResult) => {
                        res.status(200).json({
                            status: true,
                            filepath: outputImageName,
                            message: "Image reduced successfully"
                        });
                    }).catch((err) => {
                        console.log(err)
                    res.status(500).json({
                        status: false,
                        message: "unable to crop image"
                    });
                });
            })
            }else{
                res.status(400).json({
                    status: false,
                    message: "Unacceptable image format. Please upload a jpeg or png"
                })
            }
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            status: false,
            message: "Unable to download. Please make sure the request is an image url. Add a http or https."
        })
    }

};
const download = (uri, filename, callback) =>{
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

module.exports = {
    Image_thumbnail
}

