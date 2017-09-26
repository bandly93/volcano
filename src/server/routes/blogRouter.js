var express = require('express');
var blogRouter = express.Router();
var Blog = require('../models/blog');
var crud = require('../utils/crudFunctions');


blogRouter.route('/')

.post(function(req,res){
	console.log(req.body)
	crud.post(req,res,Blog);
})

blogRouter.get('/data',function(req,res){
	crud.getAll(req,res,Blog)
})

module.exports = blogRouter;