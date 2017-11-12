var express = require('express');
var uploadRouter = express.Router();
var fs = require('fs');
var util = require('util');
var config = require("../../../config.js");
var { URL } = require("url");

//upload photos route
uploadRouter.route('/')
.get((req,res)=>{
	getData(req,res);
})
.post((req,res)=>{	
	const img = req.body.data;
	img.map(obj => {
		var data = obj.data.replace(/^data:image\/\w+;base64,/,"");
		var buf = new Buffer(data,'base64');
		fs.writeFile('./src/client/public/images/uploads/'+obj.name,buf,(error)=>{
			if(error){console.log(error)}
		});
	});	
})
.delete((req,res)=>{
	fs.unlink('./src/client/public/images/uploads/'+req.body.data);

	
});
const getData = (req,res) => {
	let data = getFiles();

	return new Promise((resolve,reject)=>{
		if(data){
			resolve(data);
		}else{
			reject(error);
		}
	}).then(data => {
		res.json({images:data});
	}).catch((err)=>{
		console.error(err);
	});
};	


const getFiles = () =>{
	let dir = new URL(config.dir.DIR_BAND);
	let files = fs.readdirSync(dir);
	let filePath = '/images/uploads/';
	return files.map(file => file = ({name:file,path:filePath+file}));	
}

module.exports = uploadRouter;
