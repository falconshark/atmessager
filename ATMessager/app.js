var fs = require('fs');
var nconf = require('nconf');
nconf.argv()
.env()
.file({ file: './botlist.json' });

var express = require('express');
var bodyParser = require('body-parser');
var app = new express();

var router = require('./route.js');
var server = require('./server.js');

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.set('views',__dirname+'/views');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/', router);
}

server.setServer(app);
module.exports = app;
