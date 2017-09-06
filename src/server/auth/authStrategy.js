var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
		passReqToCallBack: true
	},
	function(req,username,password,done){
		User.findOne({username:username},function(err,user){
			/*
			if(err){
				return next(err);
			}
			if(!user){
				return res.json({error:'cant find user'})
			}*/
			
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
	}
))

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

module.exports = passport;