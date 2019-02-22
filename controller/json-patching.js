'use strict';

const { applyOperation, applyPatch } = require('fast-json-patch');


const ApplyPatch = (req, res, next) => {
    try{

        //To check if there is a request body
        if(req.body){

            //To check if the request body data contains the necessary data
            if(req.body.json_parse_object && req.body.json_object ){

                //To check if the request body data types are objects
                if(typeof req.body.json_parse_object === 'object' && typeof req.body.json_object === 'object'){

                    let document_object = req.body.json_object
                    let parse_object = req.body.json_parse_object


                    /*when parse_object is an array, use @applyPatch
                    * when parse_object is an object, use @applyOperation
                    */

                    if(parse_object.length > 0){
                        document_object = applyPatch(document_object, parse_object).newDocument;
                    }else if(Object.keys(parse_object).length > 0){
                        document_object = applyOperation(document_object, parse_object).newDocument;
                    }else{
                        res.status(400).json({
                            success: false,
                            message: 'Unable to parse data. ',
                            data: document_object
                        })
                    }

                    res.status(200).json({
                        success: true,
                        message: 'Data has been parsed. ',
                        data: document_object
                    })

                }else{
                    res.status(400).json({
                        success: false,
                        message: 'Please check the data type and resend. '
                    })
                }
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Missing object. Either the document object or the patch object is missing.'
                })
            }
        }else{
            res.status(400).json({
                success: false,
                message: 'Request body not found.'
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Unable to complete request.'
        })
    }


};

module.exports ={
    ApplyPatch
};