var fs = require('fs');
var nconf = require('nconf');
nconf.argv()
.env()
.file({ file: './config.json' });

//Require log4js for display running log
var log4js = require('log4js');
var logger = log4js.getLogger('Server');

function setServer(app){

  var port = nconf.get('server').port;  

}
