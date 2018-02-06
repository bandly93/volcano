var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport,res){

	passport.use('register',new LocalStrategy({
		passReqToCallback:true,
	},
		function(req,username,password,done){
			User.findOne({'username':username},function(err,user){
				if(err){
					console.log('error')
					return res.json(err);}
				if(!user){
					var newUser = new User();
					newUser.username = username;
					newUser.password = newUser.generateHash(password);
					newUser.save(function(err){
						if(err){
							console.log(err)
						}
//						console.log('saved new user')
						console.log(req.user)
						return res.json({success:'You are now registered.'})
					})
				}
				if(user){
					return res.json({err:'user already exist'})
				}
			})
		}
	));
}
