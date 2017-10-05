var mongoose = require('mongoose');


exports.getAll =(req,res,model) =>{
	model.find({}).sort('-createdAt').limit(3).exec(function(err,content){
		if(err){
			//throw err;
			console.log(err)
			res.json({err:'error'});
		} 
		//console.log(content)
		res.json(content);
	})
}
exports.delete = (req,res,model,cb) =>{
	model.findOneAndRemove(req.body).exec(function(err,removed){
		if(err){
			console.log(err);
		}
		cb(req,res,model);
	})
}
exports.post = (req,res,model) =>{
	var content = new model(req.body);
	content.save(function(err){
		if(err){
			console.log(err);
			res.json({err:'error'})
		}
		res.json({msg:'success!'})
	})
}
exports.getOld = (req,res,model) =>{
    if(mongoose.Types.ObjectId.isValid(req.query.old)){
        model.find({_id:{$lt:req.query.old}})
        .sort('-createdAt')
        .limit(3)
        .exec(function(err,content){
            if(err){
                console.log(err)
                res.json({err:'error'});
            }
            res.json(content);
        })
    }
    else{
        res.json([])
    }
}

exports.getNew = (req,res,model) =>{
    if(mongoose.Types.ObjectId.isValid(req.query.new)){
        model.find({_id:{$gt:req.query.new}})
        .limit(3)
        .exec(function(err,content){
            if(err){
                console.log(err)
                res.json({err:'error'});
            }
            res.json(content.reverse());
        })
    }
    else{
        res.json([])
    }
}