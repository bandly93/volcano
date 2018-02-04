var express = require('express');
var vimeoRouter = express.Router();
var Vimeo = require('../models/vimeo');
var ObjectId = require('mongodb').ObjectID;

const findAll = (req,res) => {
	
	Vimeo.find({},null,{sort:{slideId:1}},(err,data) => {
		if(err){
			console.log(err);
		}else{
			res.json({slides:data});
		}
	})
}

vimeoRouter.route('/')
.get((req,res) => {
	findAll(req,res);
})

.put((req,res) => {
	const { name,url,videoId,slideId,thumbnail,_id }  = req.body.data;
	Vimeo.findOneAndUpdate(
		{slideId,"items._id":_id},
		{$set:
			{
				"items.$.name":name,
				"items.$.url":url,
				"items.$.thumbnail":thumbnail,
			}
		},(err,response) => {
			console.log(response);
			if(err){
				console.log(err);
			}else{
				console.log("Successfully added entry into database");
				findAll(req,res);
			}
		}
	)
})

.post((req,res) => {
	const { name,url,videoId,slideId,thumbnail} = req.body.data;
	Vimeo.update({slideId},{$push:{items:{name,url,thumbnail}}},(err,response) => {
		if(err){
			console.log(err)
		}else{
			console.log("Sucessfully incremented list.");
			findAll(req,res);
		}
	})	
})

.delete((req,res) => {
	const { _id,slideId } = req.body.data;
	Vimeo.update({slideId},{$pull:{items:{_id}}},(err,response) => {
		if(err){
			console.log(err);
		}else{
			console.log("Successfully deleted video.");
			findAll(req,res);
		}
	})
})


module.exports = vimeoRouter;
