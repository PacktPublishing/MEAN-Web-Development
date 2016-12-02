// Load the module dependencies
const config = require('./config');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');
const configureSocket = require('./socketio');

// Define the Express configuration method
module.exports = function(db) {
	// Create a new Express application instance
	const app = express();
	
	// Create a new HTTP server
    const server = http.createServer(app);

    // Create a new Socket.io server
    const io = socketio.listen(server);

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the MongoDB session storage
	const mongoStore = new MongoStore({
		mongooseConnection: db.connection
	});

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Configure the flash messages middleware
	app.use(flash());

	// Configure the Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Configure static file serving
	app.use('/', express.static(path.resolve('./public')));
	app.use('/lib', express.static(path.resolve('./node_modules')));
	
	// Load the routing files	
	require('../app/routes/users.server.routes.js')(app);	
	require('../app/routes/articles.server.routes.js')(app);
	require('../app/routes/index.server.routes.js')(app);

	// Load the Socket.io configuration
	configureSocket(server, io, mongoStore);
	
	// Return the Server instance
	return server;
};