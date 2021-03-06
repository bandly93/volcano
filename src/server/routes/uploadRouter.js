var express = require('express');
var uploadRouter = express.Router();
var crud = require('../utils/uploadCrudFunctions');

//upload photos route
uploadRouter.route('/')

.get((req,res)=>{
	crud.get(req,res);
})

.put((req,res)=>{
	crud.put(req,res);
})

.post((req,res)=>{	
	crud.post(req,res);	
})

.delete((req,res)=>{
	crud.delete(req,res);
});

module.exports = uploadRouter;
