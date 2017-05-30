const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// application
const app = express();
const path = require('path');

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static resources
app.use(express.static(path.join(__dirname, 'public')));

// express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// express-message
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// routes
const readDb = require('./routes/readDb/index');
const writeDb = require('./routes/writeDb/index');
const users = require('./routes/users');
const index = require('./routes/index');

// set router
app.use('/read', readDb);
app.use('/write', writeDb);
app.use('/users', users);
app.use('/', index);

// set port
app.set('port', (process.env.PORT || 3000));

// start server
app.listen(app.get('port'), () => {
	console.log('Server started on port ' + app.get('port'));
});
