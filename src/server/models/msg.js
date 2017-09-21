var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Msg = new Schema({
	name: String,
	email:String,
	message:String,
	//date:{type:Date,required:true}
},{
	timestamps:true
})

module.exports = mongoose.model('Msg', Msg);