var express = require('express');
var uploadRouter = express.Router();
var fs = require('fs');
var util = require('util');
var formidable = require("formidable");
var config = require("../../../config.js");
var {URL} = require("url");


uploadRouter.route('/upload')

.post((req,res)=>{
	/*	
	var img = req.body.image;
	var ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
	var data = img.replace(/^data:image\/\w+;base64,/,"");
	var buf = new Buffer(data,'base64');	
	fs.writeFile('./src/client/public/images/uploads/woodpecker.'+ext,buf);
	*/
	
		
	let form = new formidable.IncomingForm();
	form.uploadDir = "./src/client/public/images/uploads/";
	form.keepExtensions = true;
	form.encoding = 'utf-8';
	form.type = 'multipart/data-form';
	form.maxFieldSize = 10 * 1024 * 1024;
	form.multiples = true;
	form.parse(req,(err,fields,files) => {
		console.log(req.body.image);
		if (err){
			console.log(err);
			res.json({
				result: "Error on upload",
				data: {},
				message: `Error on uploading photo. Error Message : ${err}`	
			});
		}else{
		
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
});


//get all photo names
uploadRouter.route('/getFiles')
.post((req,res)=>{
	let dir = new URL(config.dir.DIR_BAND);
		
	console.log(getFiles(dir));
});

const getFiles = (dir) => {
	var files = fs.readdirSync(dir);
	return files.map(file => file=({name:file,path:dir+file}));
}

module.exports = uploadRouter;
