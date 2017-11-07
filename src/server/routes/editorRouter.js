var express = require('express');
var editorRouter = express.Router();
var Editor = require('../models/editor');
var crud = require('../utils/crudFunctions');


editorRouter.route('/')

.post(function(req,res){
    crud.post(req,res,Editor);
})








module.exports = editorRouter;
