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

var folderPath = './src/client/public/images/uploads';
var imagePath = '../images/uploads';

//get all folders and specific photos from file storage system.
const getBoth = (req,res) => {
	const { folderName } = req.body;
	let photos = fs.readdirSync(folderPath+"/"+folderName).filter(photo => photo != ".DS_Store");
	let folders = fs.readdirSync(folderPath).filter(folder => folder != ".DS_Store");
	let action1 = folders.map(folder => ({name:folder,path:imagePath+folder}));
	let action2 = photos.map(photo => ({name:photo,path:imagePath+'/'+folderName+'/'+photo}));
	let promiseArray = [Promise.resolve(action1),Promise.resolve(action2)];	
	Promise.all(promiseArray).then(data => {
		res.json({folders:data[0],images:data[1],folderName});
	}).catch(error => {
		console.log("error from getBoth" + error);
	})	
}

//get all folders 
const getFolder = (req,res) => {
	let folders = fs.readdirSync(folderPath).filter(folder => folder != ".DS_Store");
	let action = folders.map(folder => ({name:folder,path:imagePath+folder}));
	let promise = new Promise((resolve,reject) => {
		resolve(action);
	}).then(folders => {
		res.json({folders});
	}).catch(error => {
		console.error("error from getFolders " + error);
	})
}

//delete the target item from file storage system.
const deleteFunc = (req,res) => {
	const { value,folderName,name } = req.body;
	if(value === 'photo'){
		fs.unlink(folderPath+folderName+"/"+name,(error) => {
			if (error){
				console.log("error from deletePhoto " + error);
			}else{
				getBoth(req,res)
			}
		})
	}else if(value === 'folder'){
		fs.rmdir(folderPath+name,(error) => {
			if(error){
				console.log("error from deleteFolder " + error);
			}else{
				getFolder(req,res)
			}
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
			fs.writeFile(folderPath+'/'+folderName+'/'+image.name,buf,(error) => {
				if (error){
					console.log("error from add Photos "+ error);
				}
				getBoth(req,res);	
			});
		})
	}else if(folder){
		fs.mkdir(folderPath+folder,(error) => {
			if(error){
				console.log("error from add folder " + error);
			}else{
				getFolder(req,res);
			}
		});	
	}	
}
