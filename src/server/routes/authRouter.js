var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

authRouter.route('/reg')

.post(function(req,res,next){
	require('../auth/regStrategy')(passport,res);
	if(!req.body.username || !req.body.password){
		return res.json({message:'incomplete form'})
	}
	passport.authenticate('register')(req,res,next);
})

authRouter.route('/log')

.post(function(req,res,next){
	require('../auth/logStrategy')(passport,res);
	passport.authenticate('login')(req,res,next);
})

module.exports = authRouter;