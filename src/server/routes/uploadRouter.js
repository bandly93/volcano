var express = require('express');
var uploadRouter = express.Router();
var fs = require('fs');
var util = require('util');
var formidable = require("formidable");
uploadRouter.route('/')

.post((req,res)=>{
	var img = req.body.image;
	var ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
	var data = img.replace(/^data:image\/\w+;base64,/,"");
	var buf = new Buffer(data,'base64');
	
	fs.writeFile('./src/client/public/images/uploads/image.'+ext,buf);
	


	/*	
	let form = new formidable.IncomingForm();
	form.uploadDir = "./src/client/public/images/uploads/";
	form.keepExtensions = true;
	form.encoding = 'utf-8';
	form.type = 'multipart/data-form';
	//form.maxFieldSize = 10 * 1024 * 1024;
	form.multiples = true;
	
	form.parse(req,(err,fields,files) => {
		console.log("You made it inside the form");
		if (err){
			console.log(err);
			res.json({
				result: "Error on upload",
				data: {},
				message: `Error on uploading photo. Error Message : ${err}`	
			});
		}else{
			console.log(req.body);
		
		
			if (arrayOfFiles.length > 0){
				let fileNames = [];
				arrayOfFiles.forEach(imageFile => fileNames.push(imageFile.name));
				res.json({
					result:"ok",
					data: fileNames,
					numberOfImages: fileNames.length,
					message:"Upload images successfully"
				});
			}else{
				res.json({
					result:"failed",
					data:{},
					numberOfImages:0,
					message:"No images to upload !"
				});
			}	
		}	
	});
	*/
});

module.exports = uploadRouter;
