var mongoose = require('mongoose');
var num = 3;

exports.getAll =(req,res,model,next) =>{
	model.find({}).sort('-createdAt').limit(num).exec(function(err,content){
		if(err){
			//throw err;
			//console.log(err)
			res.json({err:'error'});
		}
        checkPagination(req,res,model,content,next); 
	})
}

exports.delete = (req,res,model,cb) =>{
	model.findOneAndRemove(req.body).exec(function(err,removed){
		if(err){
			//console.log(err);
		}
		cb(req,res,model);
	})
}

exports.post = (req,res,model) =>{
	var content = new model(req.body);
	content.save(function(err){
		if(err){
			//console.log(err);
			res.json({err:'error'})
		}
		res.json({msg:'success!'})
	})
}

exports.put = (res,model,id,change) =>{
    //console.log('put function');
    //console.log(id,change);
    
    model.findOneAndUpdate(id,change).exec(function(err,update){
        if(err){
            //console.log(err);
			res.json({
                err:'error',
                id: id._id
            })
		}
		res.json({
            msg:'success!',
            id: id._id
        })
    })
}

exports.getOld = (req,res,model,next) =>{
    if(mongoose.Types.ObjectId.isValid(req.query.old)){
        model.find({_id:{$lt:req.query.old}})
        .sort('-createdAt')
        .limit(num)
        .exec(function(err,content){
            if(err){
                //console.log(err)
                res.json({err:'error'});
            }
            checkPagination(req,res,model,content,next);
        })
    }
    else{
        res.json({});
    }
}

exports.getNew = (req,res,model,next) =>{
    if(mongoose.Types.ObjectId.isValid(req.query.new)){
        model.find({_id:{$gt:req.query.new}})
        .limit(num)
        .exec(function(err,content){
            if(err){
                //console.log(err)
                res.json({err:'error'});
            }
            checkPagination(req,res,model,content.reverse(),next);
        })
    }
    else{
        res.json({})
    }
}

function checkPagination(req,res,model,data,next){
    var paginate = {};
    model.find({_id:{$gt:data[0]}})
    .limit(1)
    .exec(function(err,content){
        if(err){
            //console.log(err);
        }
        if(!content[0]){
            ////console.log('no new content');
            paginate.new = false;
        }
        else{
            ////console.log(content)
            paginate.new = true;
        }
    })
    .then(function(){   
        model.find({_id:{$lt:data[data.length-1]}})
        .sort('-createdAt')
        .limit(1)
        .exec(function(err,content){
            if(err){
                //console.log(err);
            }
            if(!content[0]){
                ////console.log('no old content');
                paginate.old = false;
            }
            else{
            paginate.old = true;
            ////console.log('paginate function',paginate);
            ////console.log(content) 
            }
            
            res.json({
                data:data,
                page:paginate
            });
        })
    }) 
    .catch(next) 
}




















