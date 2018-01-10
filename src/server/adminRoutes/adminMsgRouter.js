var express = require('express');
var msgRouter = express.Router();
var Msg = require('../models/msg.js');
var crud = require('../utils/crudFunctions');



msgRouter.route('/')

.get(function(req,res){

	crud.getAll(req,res,Msg)

})
.delete(function(req,res){

	crud.delete(req,res,Msg,crud.getAll);

})

msgRouter.route('/:id')


.get(function(req,res,next){	
    //console.log('params',req.params,req.query)
    //console.log(req.url);
    //console.log(req);
    if(req.query.new){
//        console.log('new', req.query.new);
        crud.getNew(req,res,Msg,next);
    }
    else if(req.query.old){
//       console.log('old',req.query.old);
       crud.getOld(req,res,Msg,next);
    }
    else{
//        console.log('not new or old');
        crud.getAll(req,res,Msg,next)
    }
})






module.exports = msgRouter;
