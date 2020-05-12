var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

app.use(session({
  key: null,
  name: 'session',
  token: null, 
  secure: true,
  resave: false,
  sameSite: true,
  httpOnly: true,
  connect: false,
  saveUninitialized: true,
  maxAge: 60*60*1000,
  secret: 'it-akademy',
}));

const MongoClient = require('mongodb').MongoClient ;
// const ObjectId = require('mongodb').ObjectId ;
const url = "mongodb://localhost:27017/flipBook";
const dbName = "flipBook";
class Mongo {
  constructor() {
    if(!Mongo.instance) {
      MongoClient.connect(url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if(err) throw err ;
          Mongo.instance = client.db(dbName) ;
        });
    }
  }
  getInstance() {
    return Mongo.instance ;
  }
}
module.exports = new Mongo();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
