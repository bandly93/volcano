var express = require('express');
var msgRouter = express.Router();
var Msg = require('../models/msg.js');
var authCheck = require('../auth/authCheck');
var config = require('../../../config.js');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid.API_KEY);
var crud = require('../utils/crudFunctions');



msgRouter.route('/')

.post(function(req,res){
	//sendEmail(req,res);
	crud.post(req,res,Msg);

})



function sendEmail(req,res){
	const email = {
	  to: config.email,
	  from: 'VBZ@example.com',
	  subject: 'VBZ Inquiry from: '+req.body.name +' ('+ req.body.email+')',
	  text: req.body.message,  
	};
	//console.log(email);	
	sgMail.send(email);
}

module.exports = msgRouter;
