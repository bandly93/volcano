var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Msg = new Schema({
	name: String,
	email:String,
	message:String
})

module.exports = mongoose.model('Msg', Msg);