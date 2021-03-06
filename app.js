// Module requires
// =============================
var lessMiddleware  = require('less-middleware');
var nunjucks        = require('nunjucks');

// Isomorphic React components
// =============================
require("babel-register")({
   presets: [ 'es2015', 'react' ]
});
var ReactServerApp        = require('./public/js/server.js');
var ReactDOM = require('react-dom');
var ReactDOMServer  = require('react-dom/server');

// Express Cofiguration
// =============================
var express = require('express');
var app = express();

// Template Cofiguration
// =============================
nunjucks.configure('views', {
    autoescape: true,
    express: app
});


// Middleware
// =============================
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));


// Routing
// =============================
app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/react', function(req, res){
  var markup = ReactDOMServer.renderToString(ReactServerApp);
  res.render('index.html', {markup: markup});
});

app.get('/styleguide', function(req, res) {
  res.render('styleguide.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
