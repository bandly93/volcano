var fs = require("fs");

exports.get = (req,res) => {
	crudFunctions(req,res);
}

exports.put = (req,res) => {	
	crudFunctions(req,res,getPhotos);
}

exports.post = (req,res) => {
	const { folderName,folder,newImages } = req.body;
	// if post request has images/folder data, add that data to the system.
	if (folder||newImages){
		crudFunctions(req,res,addFunc);
	}else{
		crudFunctions(req,res,getBoth);
	}
}

exports.delete = (req,res) => {
	crudFunctions(req,res,deleteFunc);
}

const crudFunctions = (req,res,action) => {
	if(action){
		action(req,res);
	}else{
		getFolder(req,res);
	}
}

let folderPath = './src/client/public/images/uploads/';
let imagePath = '../images/uploads/';

const controller = () => {
	return {
		folders:fs.readdirSync(folderPath).filter(folder => folder != '.DS_Store'),
		photos:(folderName) => fs.readdirSync(folderPath+folderName).filter(photo => photo != '.DS_Store'),
	}	
}

//get first photo from every folder.
const getFirstPhotos = (req,res) => {
	const { folders,photos } = controller();	
	return folders.map(folderName => imagePath+folderName+"/"+photos(folderName)[0])
}

const getPhotos = (req,res) => {
	const { folderName } = req.body;
	const { photos } = controller();
	let action = photos(folderName).map(photo => ({name:photo,path:imagePath+folderName+'/'+photo}));
	res.json({modalProps:action});
}

//get all folders and specific photos from file storage system.
const getBoth = (req,res) => {
	const { folderName } = req.body;
	const { folders,photos } = controller();
	let action1 = folders.map(folder => ({name:folder,path:imagePath+folder}));
	let action2 = photos(folderName).map(photo => ({name:photo,path:imagePath+folderName+'/'+photo}));
	let data = {
		folders:action1,images:action2,
		folderName,firstImages:getFirstPhotos()
	}
	res.json(data);
}

//get all folders 
const getFolder = (req,res) => {
	const { folders } = controller();
	let action = folders.map(folder => ({name:folder,path:imagePath+folder}));	
	let data = {
		folders:action,firstImages:getFirstPhotos()
	}
	res.json(data);
}

//delete the target item from file storage system.
const deleteFunc = (req,res) => {
	const { value,folderName,name } = req.body;

	value === 'photo'?
		fs.unlink(folderPath+folderName+'/'+name,(error) => {
			error?
				console.log('error from deletePhoto ' + error)
			:
				getBoth(req,res)
		})
	:
		fs.rmdir(folderPath+name,(error) => {
			error?
				console.log('error from deleteFolder ' + error)
			:
				getFolder(req,res)
		})
}

//add item to file storage system.
const addFunc = (req,res) => {
	const { newImages,folder,folderName } = req.body;

	newImages?
		newImages.map(images => {
			let data = images.data.replace(/^data:image\/\w+;base64,/,'')
			let buf = new Buffer(data,'base64')
			fs.writeFile(folderPath+'/'+folderName+'/'+images.name,buf,(error) => {
				error?
					console.log('error from addPhotos ' + error)
				:
					getBoth(req,res)
			})
		})
	:
		fs.mkdir(folderPath+folder,(error) => {
			error?
				console.log('error from addFolder ' + error)
			:
				getFolder(req,res)
			
		})

}
