var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
//require('../auth/authStrategy')(passport);
//var LocalStrategy = require('passport-local').Strategy;

authRouter.route('/reg')

.post(function(req,res,next){
	require('../auth/authStrategy')(passport,res);
	passport.authenticate('register')(req,res,next);
}
	//authStrategy.authenticate('local')
)


module.exports = authRouter;