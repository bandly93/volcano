var { URL } = require("url");
var fs = require("fs");
var config = require("../../../config.js");

exports.get = (req,res) => {
	crudFunctions(req,res);
}

exports.post = (req,res) => {
	crudFunctions(req,res,addPhotosToFileSystem(req,res));
}

exports.delete = (req,res) => {
	crudFunctions(req,res,deletePhoto(req,res));
}

const crudFunctions = (req,res,action) =>{
	const promiseArray = [
		new Promise((resolve,reject) => resolve(action)),
		new Promise((resolve,reject) => resolve(getFiles(req,res)))
	];
	Promise.all(promiseArray)
	.then(data => {
		res.json({images:data[1]})
	})
	.catch(error =>{
		console.log(error)
	})
}

const getFiles = () => {
	let dir = new URL(config.dir.DIR_BAND);
	let files = fs.readdirSync(dir);
	let filePath = '/images/uploads/';
	return files.map(file => file = ({name:file,path:filePath+file}));
}

const deletePhoto = (req,res) =>{
	fs.unlink('./src/client/public/images/uploads/'+req.body.data,(error)=>{
		if (error){
			console.log(error)
		}else{
			console.log("Success");
		}	
	})
}

const addPhotosToFileSystem = (req,res) => {
	const img = req.body.data;
	if (img.length > 0){
		img.map(obj => {
			var data = obj.data.replace(/^data:image\/\w+;base64,/,"");
			var buf = new Buffer(data,'base64');
			fs.writeFile('./src/client/public/images/uploads/'+obj.name,buf,(error)=>{
				if (error){
					console.log(error);
				}
			});
		})
	}else{
		console.log("No photos to add");
	}
}
