var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var authStrategey = require('../auth/authStrategy');


authRouter.route('/reg')

.post(function(req,res,next){
	passport.authenticate('local',function(err,user,info){
		if(err){
			return next(err);
		}
		if(!user){
			return res.send({error:'cant find user'})
		}
	})
})
module.exports = authRouter;