var express = require('express');
var msgRouter = express.Router();
var Msg = require('../models/msg.js');
var authCheck = require('../auth/authCheck');
var config = require('../../../config.js');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid.API_KEY);
var crud = require('../utils/crudFunctions');



msgRouter.route('/')

//.get(authCheck,function(req,res){
.get(function(req,res){

	crud.getAll(req,res,Msg)

})
.post(function(req,res){

	//sendEmail(req,res);
	crud.post(req,res,Msg);

})
.delete(function(req,res){

	crud.delete(req,res,Msg,crud.getAll);

})

msgRouter.route('/:id')


.get(function(req,res,next){	
    //console.log('params',req.params,req.query)
    //console.log(req.url);
    //console.log(req);
    if(req.query.new){
//        console.log('new', req.query.new);
        crud.getNew(req,res,Msg,next);
    }
    else if(req.query.old){
//       console.log('old',req.query.old);
       crud.getOld(req,res,Msg,next);
    }
    else{
//        console.log('not new or old');
        crud.getAll(req,res,Msg,next)
    }
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
