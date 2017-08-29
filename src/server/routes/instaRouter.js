var express = require('express');
var instaRouter = express.Router();

instaRouter.route('/')

.get(function(req,res){
	res.json('instaRouter!')
})

module.exports = instaRouter;