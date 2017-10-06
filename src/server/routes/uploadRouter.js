var express = require('express');
var uploadRouter = express.Router();
var fs = require('fs-extra');
var util = require('util');
var formidable = require("formidable");
uploadRouter.route('/')

.post((req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		res.writeHead(200,{'content-type':'text/plain'});
		res.write('received upload:');
   	    res.end(util.inspect({fields: fields, files: files}));
	});
	form.on('end',function(fields,files){
		var file_name =  this.openedFiles[0].name;
	    var temp_path = this.openedFiles[0].path;
	    var new_location = './src/client/public/images/uploads/';
		fs.copy(temp_path,new_location+file_name,function(err){
			if (err){
				console.error(err);
			
			}else{
				console.log("Sucessfully added a photo to the file storage system!");
			}
	
		});
	});	
});

module.exports = uploadRouter;
