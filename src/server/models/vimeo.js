var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vimeoData = new Schema({
	slideId:Number,
	items:[{name:String,url:String,picId:Number,thumbnail:String}]	
});

module.exports = mongoose.model('VimeoData', vimeoData);
