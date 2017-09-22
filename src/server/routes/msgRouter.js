var express = require('express');
var msgRouter = express.Router();
var Msg = require('../models/msg.js');
var authCheck = require('../auth/authCheck');

var config = require('../../../config.js')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid.API_KEY);

msgRouter.route('/')
//.get(authCheck,function(req,res){
.get(function(req,res){
	getMessages(req,res);
})
.post(function(req,res){
	const email = {
	  to: 'stevenle2011@gmail.com',
	  from: req.body.email,
	  subject: 'VBZ Inquiry from: '+req.body.name,
	  text: req.body.message,
	  
	};
		
	sgMail.send(email);
	console.log(req.body)
	var msg = new Msg(req.body)
	msg.save(function(err){
		if(err){
			console.log(err);
			res.json({err:'error'})
		}
		res.json({msg:'success!'})
	})
})
.delete(function(req,res){
	//console.log('delete!')
	//console.log(req.body)
	Msg.findOneAndRemove(req.body).exec(function(err,removed){
		if(err){
			console.log(err);
		}
		getMessages(req,res);
	})
})


function getMessages(req,res){
	Msg.find({}).sort('-createdAt').exec(function(err,msgs){
		if(err){
			//throw err;
			console.log(err)
			res.json({err:'error'});
		} 
		//console.log(msgs)
		res.json(msgs);
	})
}


module.exports = msgRouter;