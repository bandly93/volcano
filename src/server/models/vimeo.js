var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vimeoData = new Schema({
	slideId:Number,
	items:[{name:String,url:String,videoId:Number,thumbnail:String}]	
});

module.exports = mongoose.model('VimeoData', vimeoData);

//insert data
	//collection.insert({slideId:1,items:[{name:"stuff",url:"stuff";"picId:"",thumbnail:""}]});
//update data
	//collection.update({slideId:1},{$push:{items:{name:"newstuff",url:"newstuff",picId:"2",thumbnail:"hello"}}});


