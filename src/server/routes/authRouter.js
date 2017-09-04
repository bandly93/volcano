var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
//var authStrategy = require('../auth/authStrategy');
var LocalStrategy = require('passport-local').Strategy;

authRouter.route('/reg')

.post(function(req,res,next){
	passport.authenticate('local',function(err,user,info){
		if(err){
			console.log('error')
			return done(err);}
		if(!user){
			console.log('no user')
			console.log(req.body)
			res.json({message:'Incorrect username.'})
			//return done(null,false)
		}
		if(!user.validPassword(password)){
			console.log('pw not valid')
			//res.json({message:'Incorrect password.'})
			return done(null,false)
		}
		console.log('done')
		return done(null,user);
	})
})


module.exports = authRouter;