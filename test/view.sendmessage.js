'use strict';

var express = require('express');
var request = require('supertest');
var logger = require('log4js').getLogger('Unit-Test');

exports['Test send message success'] = function(test){

	var sendObject = {
		message:{
			receiver:'@tester';
			text:'Hello World!';
	}

	time:new Date().getTime();
	

}
