var express = require('express');
var blogRouter = express.Router();
var Blog = require('../models/blog');
var crud = require('../utils/crudFunctions');


blogRouter.route('/')

.post(function(req,res){
	//console.log(req.body)	
    crud.post(req,res,Blog);
})

blogRouter.route('/:id')

.get(function(req,res,next){	
    //console.log('params',req.params,req.query)
    //console.log(req.url);
    //console.log(req);
    if(req.query.new){
        //console.log('new', req.query.new);
        crud.getNew(req,res,Blog,next);
    }
    else if(req.query.old){
       //console.log('old',req.query.old);
       crud.getOld(req,res,Blog,next);
    }
    else{
        //console.log('not new or old');
        crud.getAll(req,res,Blog,next)
    }
})

.post(function(req,res){
    console.log(req.params,req.query)
    crud.getTen(req,res,Blog)    
})


module.exports = blogRouter;
