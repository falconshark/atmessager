'use strict';

var express = require('express');
var request = require('supertest');
var logger = require('log4js').getLogger('Unit-Test');
var nconf = require('nconf');
var crypto = require('cyprto');

exports['Test send message success'] = function(test){

	var time = new Date().getTime();

	var data = {
		receiver:'@tester';
		text:'Hello World!';
	}

	var salt = secret;

	var signature = sha1sum

	var sendObject = {
		message:message,
		time:time,
		signature:signature
}
