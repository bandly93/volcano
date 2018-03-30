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
var config = require('../../config.js');


app.use(bodyParser.urlencoded({
	extended:true,
	limit:'50mb',
	parameterLimit:50000000
}));
app.use(require('cookie-parser')());

// database
var mongoose = require('mongoose');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/volcano'
var promise = mongoose.connect(url)
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	console.log('Connected correctly to server');
})

// static files

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});


app.use(express.static(path.resolve(__dirname ,'../../dist')));
app.use('/',express.static(path.resolve(__dirname ,'../client/public')));

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var sess = {
    store: new MongoStore({url:url}),
	secret: config.secret,
	resave:false,
	saveUninitialized:false,
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// routers
var authRouter = require('./routes/authRouter');
var msgRouter = require('./routes/msgRouter');
var uploadRouter = require('./routes/uploadRouter');
var editorRouter = require('./routes/editorRouter');
var apiRouter = require('./adminRoutes/apiRouter');
var vimeoRouter = require('./routes/vimeoRouter');

// admin api
app.use('/api', apiRouter);

// client api
app.use('/auth', authRouter);
app.use('/msg',msgRouter);
app.use('/upload',uploadRouter);
app.use('/editor',editorRouter);
app.use('/vimeo',vimeoRouter);

// redirect to client
app.get('*', function(req,res){
    res.sendFile(path.resolve(__dirname ,'../client/public/index.html'))
})

app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})

