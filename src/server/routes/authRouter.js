var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');

passport.serializeUser(function(user, done) {
	console.log('--serialized--')
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	console.log('--deserialized--')
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

authRouter.route('/reg')

.post(function(req,res,next){
	if(!req.body.username || !req.body.password){
		return res.json({message:'incomplete form'})
	}
	require('../auth/regStrategy')(passport,res);
	passport.authenticate('register')(req,res,next);
})

authRouter.route('/log')

.post(function(req,res,next){
	if(!req.body.username || !req.body.password){
		return res.json({message:'incomplete form'})
	}
	require('../auth/logStrategy')(passport,res);
	passport.authenticate('login')(req,res,next);
})

module.exports = authRouter;