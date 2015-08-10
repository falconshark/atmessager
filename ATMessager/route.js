var express = require('express');
var health = require('./health.js');
var message = require('./message.js');

var log4js = require('log4js');
var logger = log4js.getLogger('Routes');

var router = express.Router();

router.get('/',health.healthCheck);
router.post('/message',message.sendMessage);

//Exports router
module.exports = router;
