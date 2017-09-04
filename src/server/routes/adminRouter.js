var express = require('express');
var adminRouter = express.Router();

adminRouter.post('/login',function(req,res){

})

adminRouter.post('/reg',function(req,res){
	console.log('register')
	console.log('username',req.body.username)
	console.log('password',req.body.password)
	res.json({register:'success!'})
})

module.exports = adminRouter;