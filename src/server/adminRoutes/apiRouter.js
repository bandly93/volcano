var express = require('express');
var apiRouter = express.Router();
var authCheck = require('../auth/authCheck');

/*
apiRouter.all('*', authCheck, function(req, res, next) {
    next();
})
*/
var adminMsgRouter = require('./adminMsgRouter');
var adminEditorRouter = require('./adminEditorRouter');



apiRouter.use('/msg', adminMsgRouter);
apiRouter.use('/editor', adminEditorRouter);




module.exports = apiRouter;
