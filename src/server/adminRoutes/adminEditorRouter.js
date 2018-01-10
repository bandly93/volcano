var express = require('express');
var editorRouter = express.Router();
var Editor = require('../models/editor');
var crud = require('../utils/crudFunctions');


editorRouter.route('/')

.post(function(req,res){
    crud.post(req,res,Editor);
})

.delete(function(req,res){
    crud.delete(req,res,Editor,crud.getAll)
})

.put(function(req,res){
    const {_id,editor} = req.body;
    const query = {_id};
    const update = {editor};
    crud.put(res,Editor,query,update);
})






module.exports = editorRouter;
