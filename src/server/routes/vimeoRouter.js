var express = require('express');
var vimeoRouter = express.Router();
var Vimeo = require('../models/vimeo');

vimeoRouter.route('/')
.get((req,res) => {
	//find data
	Vimeo.find({},(err,data)=>{
		if(err){
			console.log(err);
		}else{
			res.json({urlObj:data});
		}
	});
})

.post((req,res) => {
	console.log(req.body);
	/*	
	//create data
	Vimeo.create({},(err,newlyCreated) => {
		if(err){
			console.log(err);
		}else{
			console.log(newlyCreated);
		}
	})
	*/
})

.delete((req,res) => {
	
})

module.exports = vimeoRouter;
