var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport,res){

	passport.use('login',new LocalStrategy({
		passReqToCallback:true,
	},
		function(req,username,password,done){
			User.findOne({'username':username},function(err,user){
				if(err){
					console.log('error')
					return res.json(err);}
				if(!user){
					console.log('no user')
					console.log(req.body)
					return res.json({message:'User does not exist.'})		
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
	));
}