var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');

passport.serializeUser(function(user, done) {
	//console.log('--serialized--')
	//console.log('--id--',user._id)
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	//console.log('--deserialized--')
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

authRouter.route('/reg')

.post(function(req,res,next){
	if(!req.body.username || !req.body.password){
		return res.json({err:'incomplete form'})
	}
	require('../auth/regStrategy')(passport,res);
	passport.authenticate('register')(req,res,next);
})

authRouter.route('/log')

.get(function(req,res){
	if(req.user){
		res.json({
            user:req.user.username,
        })
	}
	else{
		res.json({})
	}
})
.post(function(req,res,next){
	if(!req.body.username || !req.body.password){
		return res.json({err:'incomplete form'})
	}
	require('../auth/logStrategy')(passport,res);
	passport.authenticate('login')(req,res,next);
})

authRouter.route('/logout')

.get(function(req,res){
	req.logOut();
	res.clearCookie('connect.sid');
	res.json({success:'You have logged out.'})
})


module.exports = authRouter;
