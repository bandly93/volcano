var express = require('express');
var vimeoRouter = express.Router();
var Vimeo = require('../models/vimeo');

const findAll = (req,res) => {
	Vimeo.find({},(err,data) => {
		if(err){
			console.log(err);
		}else{
			res.json({urlObj:data});	
		}
	})
}

vimeoRouter.route('/')
.get((req,res) => {
	findAll(req,res);
})

.post((req,res) => {
	//first check if entry already exist.
	const { name,url,id }  = req.body;
	Vimeo.find({$or:[{url},{name}]},(err,response) => {
		if(err){
			console.log(err);
		}else{
			if(response.length === 0){
				//find that specific id and replace... keeps array fixed at 4
				Vimeo.findOneAndUpdate({id},{$set:{name,url}},(err,response) => {
					if(err){
						console.log(err);
					}else{
						console.log("Successfully added entry into database");
						findAll(req,res);
					}
				})
			}else{
				console.log("Entry already exist");
			}
		}
	})
})

.delete((req,res) => {
	
})

module.exports = vimeoRouter;