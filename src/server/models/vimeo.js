var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vimeoData = new Schema({
	name:String,
	url:String
});

module.exports = mongoose.model('VimeoData', vimeoData);
