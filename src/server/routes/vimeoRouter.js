var express = require('express');
var vimeoRouter = express.Router();
var Vimeo = require('../models/vimeo');

const findAll = (req,res) => {
	Vimeo.find({},(err,data) => {
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

.post((req,res) => {

		//first check if entry already exist.
	const { name,url,videoId,slideId,thumbnail }  = req.body;

	Vimeo.findOneAndUpdate(
		{slideId,"items.videoId":videoId},
		{$set:
			{
				"items.$.name":name,
				"items.$.url":url,
				"items.$.thumbnail":thumbnail,
				"items.$.videoId":videoId
			}
		},(err,response) => {
			if(err){
				console.log(err);
			}else{
				console.log("Successfully added entry into database");
					findAll(req,res);
			}
		
		}
	)
})

module.exports = vimeoRouter;
