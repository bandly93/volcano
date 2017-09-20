var express = require('express');
var msgRouter = express.Router();
var Msg = require('../models/msg.js');

msgRouter.route('/')

.post(function(req,res){
	console.log(req.body)
	var msg = new Msg(req.body)
	msg.save(function(err){
		if(err) return handleError(err);
	})
	Msg.find({}).exec(function(err,msg){
		if(err) throw err;
		res.json(msg);
	})
})


module.exports = msgRouter;