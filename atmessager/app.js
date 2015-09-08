var express = require('express');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var fs = require('fs');
var nconf = require('nconf');

var customsConfig = process.argv[2];
var customsBots = process.argv[3];
var customsSenders = process.argv[4];
var customsReceivers = process.argv[5];

if (!customsConfig || !customsBots || !customsSenders || !customsReceivers) {
    nconf.file('bots', __dirname + '/config/bots.json')
    .file('senders', __dirname + '/config/senders.json')
	.file('receviers', __dirname + '/config/receivers.json')
	.file('config', __dirname + '/config/config.json');
}else{
    nconf.file('bots', customsBots)
    .file('senders', customsSenders)
    .file('receviers', customsReceivers)
    .file('config', customsConfig);
}

var access_log_path = nconf.get('access_log').path;
var app_log_path = nconf.get('app_log').path;

log4js.clearAppenders();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(access_log_path), 'ACCESS_LOG');
log4js.addAppender(log4js.appenders.file(app_log_path), 'APP_LOG');

var logger = log4js.getLogger('APP_LOG');

var app = new express();

var router = require('./route.js');
var server = require('./server.js');


app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(log4js.connectLogger(log4js.getLogger('ACCESS_LOG'), {
	level: 'auto'
}));

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/', router);

server.startServer(app);
module.exports = app;
