var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
	rawTitle:String,
	htmlTitle:String,
	rawBlog:String,
	htmlBlog:String
},{
	timestamps:true
})

module.exports = mongoose.model('Blog', Blog);
