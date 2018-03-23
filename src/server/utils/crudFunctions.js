var mongoose = require('mongoose');
var num = 3;

exports.getAll =(req,res,model,next) =>{
	model.find({}).sort('-createdAt').limit(num).exec(function(err,content){
		if(err){
			//throw err;
			//console.log(err)
			res.json({err:'error'});
		}
//        console.log(content); 
     //   checkPagination(req,res,model,content,next); 
        checkPage(req,res,model,content,next);
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

// Pagination functions
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
            //checkPagination(req,res,model,content,next);
            checkPage(req,res,model,content,next);
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
            //checkPagination(req,res,model,content.reverse(),next);
            checkPage(req,res,model,content.reverse(),next);
        })
    }
    else{
        res.json({})
    }
}

async function checkPage(req,res,model,data,next){
    var paginate = {};
    //console.log('checkPage new function'); 
    let [newpage,oldpage] = await Promise.all([findNew(paginate, model, data),
                        findOld(paginate, model, data)
                        ])
    //console.log('@@@@@@@@@@@ testing @@@@@@@@@@@2');

    if (newpage[0]) {
        paginate.new = true;
    }
    else {
        paginate.new = false;
    }

    if (oldpage[0]) {
        paginate.old = true;
    }
    else {
        paginate.old = false;
    }

    const fetchedData = {
        data:data,
        page:paginate
    } 
//    console.log(fetchedData);
    res.json(fetchedData);
}

function findNew(paginate, model, data) {
 //   console.log('from new', paginate);
    return model.find({_id:{$gt:data[0]}})
    .limit(1)
    .exec();
}
function findOld(paginate, model, data) {
   // console.log('from old', paginate);

    return model.find({_id:{$lt:data[data.length-1]}})
    .sort('-createdAt')
    .limit(1)
    .exec();
}















