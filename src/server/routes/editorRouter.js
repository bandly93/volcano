var express = require('express');
var editorRouter = express.Router();
var Editor = require('../models/editor');
var crud = require('../utils/crudFunctions');


editorRouter.route('/')

.post(function(req,res){
    crud.post(req,res,Editor);
})

editorRouter.route('/:id')

.get(function(req,res,next){	
    if(req.query.new){
        crud.getNew(req,res,Editor,next);
    }
    else if(req.query.old){
       crud.getOld(req,res,Editor,next);
    }
    else{
        crud.getAll(req,res,Editor,next)
    }
})







module.exports = editorRouter;
