var express = require('express');
var vimeoRouter = express.Router();

vimeoRouter.route('/')
.get((req,res) => {
	console.log(req);
})

.post((req,res) => {
	
})

.delete((req,res) => {
	
})

module.exports = vimeoRouter;
