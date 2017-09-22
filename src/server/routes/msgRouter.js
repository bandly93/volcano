var express = require('express');
var msgRouter = express.Router();
var Msg = require('../models/msg.js');
var authCheck = require('../auth/authCheck');


msgRouter.route('/')
//.get(authCheck,function(req,res){
.get(function(req,res){
	Msg.find({}).sort('-createdAt').exec(function(err,msgs){
		if(err){
			//throw err;
			console.log(err)
			res.json({err:'error'});
		} 
		//console.log(msgs)
		res.json(msgs);
	})
})
.post(function(req,res){
	//console.log(req.body)
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
	console.log('delete!')
	console.log(req.body)
})

module.exports = msgRouter;