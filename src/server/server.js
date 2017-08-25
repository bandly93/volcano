var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
var port = process.env.PORT || 3000;
var path = require('path');

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(path.resolve(__dirname ,'../../dist')));
app.use('/',express.static(path.resolve(__dirname ,'../client/public')));

console.log(path.resolve(__dirname ,'../../dist'))

app.use('/goodbye',function(req,res){
	res.send('goodbye world!')
})


app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})

