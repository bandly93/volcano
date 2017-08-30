var express = require('express');
var adminRouter = express.Router();

adminRouter.post('/login',function(req,res){

})

adminRouter.post('/reg',function(req,res){
	console.log('register')
	console.log(req.body)
	res.json({register:'success!'})
})

module.exports = adminRouter;