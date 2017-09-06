var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrpyt = require('bcryptjs');

var User = new Schema({
	username: String,
	password: String,
})

User.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
}
User.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', User);