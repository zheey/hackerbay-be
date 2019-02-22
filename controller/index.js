'use strict';

const auth = require('../controller/auth');
const json_patching = require('../controller/json-patching');
const image_thumbnail = require('../controller/image_thumbnail');

module.exports = {
    auth,
    json_patching,
    image_thumbnail
};