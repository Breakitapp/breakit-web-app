
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , models = require('./model');


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //CSS
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  // When application gets a post the router looks at the url and does the right thing
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// different configuration

// testing available
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/share', routes.index_fbshare); // For Facebook share (views/fbshare.jade)
app.get('/', routes.index);
app.get('/splash_screen',routes.index_splashscreen); // For Splash Screen (views/splashscren)
app.post('/', routes.index_post);
app.get('/popup', routes.popUp);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
