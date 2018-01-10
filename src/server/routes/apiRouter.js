var express = require('express');
var apiRouter = express.Router();


apiRouter.get('/test', function(req,res) {
    res.send('testing!');

})


module.exports = apiRouter;
