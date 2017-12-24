var fs = require("fs");
var config = require("../../../config.js");

exports.get = (req,res) => {
	crudFunctions(req,res);
}

exports.post = (req,res) => {
	const { folderName, folder , images} = req.body;
	if (folder||images){
		crudFunctions(req,res,addFunc);
	}else if (folderName){
		crudFunctions(req,res,getPhoto);
	}

		console.log(req.body);
}

exports.delete = (req,res) => {
	crudFunctions(req,res,deleteFunc);
}

//action function.
const crudFunctions = (req,res,action) => {
	if(action){
		action(req,res);
	}else{
		getFolder(req,res);
	}
}

//get all folders and photos from file storage system.
const getPhoto = (req,res) => {
	const {folderName} = req.body;
	let files = fs.readdirSync(filePath+"/"+folderName);
	let action = files.map(file => ({name:file,path:imagePath+file}));
	let promise = new Promise((resolve,reject) => {
		resolve(action);
	}).then(data => {
		res.json({images:data});
	}).catch(error => {
		console.error("error from getFiles " + error);
	})
}


//get all folders and photos from file storage system.
const getFolder = (req,res) => {
	let files = fs.readdirSync(filePath);
	let action = files.map(file => ({name:file,path:imagePath+file}));
	let promise = new Promise((resolve,reject) => {
		resolve(action);
	}).then(data => {
		res.json({folders:data});
	}).catch(error => {
		console.error("error from getFiles " + error);
	})
}

//delete the target item from file storage system.
const deleteFunc = (req,res) => {
	let type = req.body.type;
	if(type === 'photo'){
		fs.unlink(filePath+req.body.data,(error) => {
			if (error){
				console.log("error from deletePhoto " + error);
			}
			getFunc(req,res)
		})
	}else{
		fs.rmdir(filePath+req.body.data,(error) => {
			if(error){
				console.log("error from deleteFolder " + error);
			}
			getFunc(req,res)
		})
	}
}



var filePath = './src/client/public/images/uploads/';
var imagePath = '../images/uploads/';

//get all folders and photos from file storage system.
const getFunc = (req,res) => {
	let files = fs.readdirSync(filePath);
	let action = files.map(file => ({name:file,path:imagePath+file}));
	let promise = new Promise((resolve,reject) => {
		resolve(action);
	}).then(data => {
		res.json({folders:data});
	}).catch(error => {
		console.error("error from getFiles " + error);
	})
}
//add item to file storage system.
const addFunc = (req,res) => {
	const { images,folder } = req.body;
	if (images){
		images.map(image => {
			var data = image.data.replace(/^data:image\/\w+;base64,/,"");
			var buf = new Buffer(data,'base64');
			fs.writeFile(filePath+image.name,buf,(error) => {
				if (error){
					console.log("error from add Photos "+ error);
				}
				getFunc(req,res);
			});
		})
	}else if(folder){
		fs.mkdir(filePath+"/"+folder,(error) => {
			if(error){
				console.log("error from add folder " + error);
			}
			getFunc(req,res);
		});	
	}	
}
