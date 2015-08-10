var express = require('express');
var router = express.Router();
var health = require('./health');

var log4js = require('log4js');
var logger = log4js.getLogger('Routes');

router.get('/',health.healthCheck);
router.post('/message',message.sendMessage);

//Exports router
module.exports = router;
