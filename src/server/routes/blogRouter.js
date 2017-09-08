var express = require('express');
var blogRouter = express.Router();

blogRouter.route('/')

.post(function(req,res){
	console.log(req.body)
	console.log(req.user)
})


module.exports = blogRouter;