var { URL } = require("url");
var fs = require("fs");
var config = require("../../../config.js");

exports.get = (req,res) => {
	getData(req,res);
}

exports.post = (req,res) => {
	addAndRetrieve(req,res);
}

exports.delete = (req,res) => {
	deleteAndRetrieve(req,res);
}
const deleteAndRetrieve = (req,res)=> {
	return new Promise((resolve,reject) => {
		let promise = deletePhoto(req,res);
		resolve(promise);
		if (promise){
			console.log(req.body.data, " was deleted.");
		}else{
			console.log("Image could not be deleted");
		}
	}).then(()=>{
		getData(req,res);
	}).catch(error => {
		console.log(error);
	})
}

const deletePhoto = (req,res) =>{
	fs.unlink('./src/client/public/images/uploads/'+req.body.data,(error)=>{
		console.log(error);
	})
	return true
}

const addAndRetrieve = (req,res) => {
	return new Promise((resolve,reject) => {
		let promise = addPhotosToFileSystem(req,res);
		resolve(promise);
		if (promise){
			console.log("The images have been uploaded to the server");
		}else{
			console.log("No images were uploaded to the server");
		}
	}).then(() =>{
		 getData(req,res)
	}).catch(error => {
		console.log(error);
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
		return true
	}else{
		console.log("No photos to add");
	}
	
}

const getData = (req,res) => {
	return new Promise((resolve,reject) => {
		resolve(getFiles());
	}).then(data =>{
		console.log("Retrieved all photos from directory....");
		res.json({images:data});
		console.log("Photos are uploaded to redux!");	
	}).catch(error => {
		console.log(error);
	})
}

const getFiles = () => {
	let dir = new URL(config.dir.DIR_BAND);
	let files = fs.readdirSync(dir);
	let filePath = '/images/uploads/';
	return files.map(file => file = ({name:file,path:filePath+file}));
}
