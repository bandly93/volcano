var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Editor = new Schema({
    editor:Schema.Types.Mixed
},{
    timestamps:true
})


module.exports = mongoose.model('Editor',Editor);
