var fs = require("fs");

exports.get = (req,res) => {
	crudFunctions(req,res);
}

exports.post = (req,res) => {
	const { folderName,folder,images } = req.body;
	// if post request has images/folder data, add that data to the system.
	if (folder||images){
		crudFunctions(req,res,addFunc);
	}else{
		crudFunctions(req,res,getBoth);
	}
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

var filePath = './src/client/public/images/uploads/';
var imagePath = '../images/uploads/';

//get all folders and specific photos from file storage system.
const getBoth = (req,res) => {
	const { folderName } = req.body;
	let folders = fs.readdirSync(filePath);
	let photos = fs.readdirSync(filePath+"/"+folderName);	
	let action1 = folders.map(folder => ({name:folder,path:imagePath+folder}));
	let action2 = photos.map(photo => ({name:photo,path:imagePath+'/'+folderName+'/'+photo}));
	let promiseArray = [Promise.resolve(action1),Promise.resolve(action2)];	
	Promise.all(promiseArray).then(data => {
		res.json({images:data[1],folders:data[0],folderName:folderName});
	}).catch(error => {
		console.log("error from getFiles" +error);
	})	
}

//get all folders 
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
	const { type,folderName,data } = req.body;
	if(type === 'photo'){
		fs.unlink(filePath+folderName+"/"+data,(error) => {
			if (error){
				console.log("error from deletePhoto " + error);
			}
			getBoth(req,res)
		})
	}else if(type === 'folder'){
		fs.rmdir(filePath+data,(error) => {
			if(error){
				console.log("error from deleteFolder " + error);
			}
			getFolder(req,res)
		})
	}
}

//add item to file storage system.
const addFunc = (req,res) => {
	const { images,folder,folderName } = req.body;
	if (images){
		images.map(image => {
			var data = image.data.replace(/^data:image\/\w+;base64,/,"");
			var buf = new Buffer(data,'base64');
			fs.writeFile(filePath+'/'+folderName+'/'+image.name,buf,(error) => {
				if (error){
					console.log("error from add Photos "+ error);
				}
				getBoth(req,res);
			});
		})
	}else if(folder){
		fs.mkdir(filePath+folder,(error) => {
			if(error){
				console.log("error from add folder " + error);
			}
			getFolder(req,res);
		});	
	}	
}
