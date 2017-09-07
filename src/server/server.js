//server
var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
var port = process.env.PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(require('cookie-parser')());


//database
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


//static files
/*
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
*/

app.use(express.static(path.resolve(__dirname ,'../../dist')));
app.use('/',express.static(path.resolve(__dirname ,'../client/public')));


//passport
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


//routers
var adminRouter = require('./routes/adminRouter');
var flickrRouter = require('./routes/flickrRouter');
var instaRouter = require('./routes/instaRouter');
var authRouter = require('./routes/authRouter');
var cloudRouter = require('./routes/cloudRouter');


app.use('/auth',authRouter);
app.use('/admin',adminRouter);
app.use('/flickr',flickrRouter);
app.use('/insta',instaRouter);
//app.use('/cloud',cloudRouter);


//redirect  to client
app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname ,'../client/public/index.html'))
})


app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})

