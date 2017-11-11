var express = require('express');
var uploadRouter = express.Router();
var fs = require('fs');
var util = require('util');
var formidable = require("formidable");
var config = require("../../../config.js");
var { URL } = require("url");

//upload photos route
uploadRouter.route('/')
.post((req,res)=>{	
	const img = req.body.data;
	img.map(obj => {
		var data = obj.data.replace(/^data:image\/\w+;base64,/,"");
		var buf = new Buffer(data,'base64');
		fs.writeFile('./src/client/public/images/uploads/'+obj.name,buf,(error)=>{
			if(error){console.log(error)}
		});
	});	
});

//get all photo name route
uploadRouter.route('/getFiles')
.post((req,res)=>{
	let dir = new URL(config.dir.DIR_BAND);
		
	console.log(getFiles(dir));
});

//delete photos route
uploadRouter.route('/delete')
.post((req,res)=>{
	fs.unlink('./src/client/public/images/uploads/'+req.body.data,(error)=>{
		if (error){console.log(error)}
	});
});

const getFiles = dir =>{
	let files = fs.readdirSync(dir);
	let filePath = '/images/uploads/';
	return files.map(file => file = ({name:file,path:filePath+file}));	
}

module.exports = uploadRouter;
