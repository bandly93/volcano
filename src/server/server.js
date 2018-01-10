//server
var express = require('express');
var morgan = require('morgan');
var app = express();
var helmet = require('helmet');
app.use(helmet());
app.use(morgan('dev'));
var port = process.env.PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended:true,
	limit:'50mb',
	parameterLimit:50000000
}));
app.use(require('cookie-parser')());

// database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/volcano'
var promise = mongoose.connect(url,{
	useMongoClient:true,
})
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	console.log('Connected correctly to server');
})


// static files
/*
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
*/

app.use(express.static(path.resolve(__dirname ,'../../dist')));
app.use('/',express.static(path.resolve(__dirname ,'../client/public')));


// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
app.use(require('express-session')({
	secret: '9054f3048dgfd',
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());




// routers
var flickrRouter = require('./routes/flickrRouter');
var authRouter = require('./routes/authRouter');
var msgRouter = require('./routes/msgRouter');
var uploadRouter = require('./routes/uploadRouter');
var editorRouter = require('./routes/editorRouter');
var apiRouter = require('./adminRoutes/apiRouter');

// admin api
app.use('/api', apiRouter);

// client api
app.use('/auth',authRouter);
app.use('/flickr',flickrRouter);
app.use('/msg',msgRouter);
app.use('/upload',uploadRouter);
app.use('/editor',editorRouter);

// redirect to client
app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname ,'../client/public/index.html'))
})



app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})

