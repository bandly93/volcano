var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vimeoData = new Schema({
	name:String,
	url:String,
	id:Number,
	thumbnail:String
});

module.exports = mongoose.model('VimeoData', vimeoData);
