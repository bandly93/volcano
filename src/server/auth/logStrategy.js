var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport,res){

	passport.use('login',new LocalStrategy({
		passReqToCallback:true,
	},
		function(req,username,password,done){
			User.findOne({'username':username},function(err,user){
				//console.log(req.user)
				if(err){
					//console.log('error')
					return res.json(err);
        }

        if (!user || !user.validPassword(password)) {
          return res.json({err: 'Invalid ID or password'});
        }
				//console.log('done')
				req.login(user,function(err){
					if(err){return next(err)}
					//console.log('req.user',req.user)
					//console.log('req.session',req.session.passport)
					return res.json({
                        user:user.username,
                        redirect:true,
                    })
					//return res.redirect('/')
				})

			})
		}
	));
}
