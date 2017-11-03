var express = require('express');
var editorRouter = express.Router();


editorRouter.route('/')

.post(function(req,res){
    console.log(req.body);

})








module.exports = editorRouter;
