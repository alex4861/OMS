const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const request = require('request');


const { url } = require('./config/database');

mongoose.connect(url, {
  useNewUrlParser: true
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})


// settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(morgan('dev'));
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'azzheztia',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(flash());
app.options('*',cors())
// routes

require('./app/routes/routes')(app, passport,cors());

// static files

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
