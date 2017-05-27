const express = require('express');
const bodyParser = require('body-parser');

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

// routes
const router = require('./routes/index');

// set router
app.use('/', router);

// set port
app.set('port', (process.env.PORT || 3000));

// start server
app.listen(app.get('port'), () => {
	console.log('Server started on port ' + app.get('port'));
});
