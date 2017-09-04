var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(res,username,password,done){
		User.findOne({username:username},function(err,user){
			if(err){return done(err);}
			if(!user){
				res.json({message:'Incorrect username.'})
				return done(null,false)
			}
			if(!user.validPassword(password)){
				res.json({message:'Incorrect password.'})
				return done(null,false)
			}
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