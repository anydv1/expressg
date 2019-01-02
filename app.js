var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const ShopUser = require('./models/shopuser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const MONGO_URL = 'mongodb://localhost:27017/Ecommerce';

var app = express();

app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions'
});



const fileStorage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage , fileFilter: fileFilter}).single('image'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(fileupload());



app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use
     (session({secret: 'secret',
     resave:false,
     saveUninitialized:false, 
     store: store
    })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
  
    next();
  });



  ShopUser.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});
 

app.use('/', indexRouter);
app.use( usersRouter);


var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URL,{useNewUrlParser:true})
  .then(result => {
    // app.listen(3000);
    console.log('connected')
  })
  .catch(err => {
    console.log(err);
  });

// mongoose.connect('mongodb://localhost:27017/Ecommerce',{ useNewUrlParser: true });
// console.log('db connected')


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
