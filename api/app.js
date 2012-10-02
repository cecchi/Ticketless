/* Ticketless */

var config    = require('./config.js'),
    routes    = require('./routes.js'),
    express   = require('express'),
    validator = require('express-validator');

// Create REST-ful servers
var app = express();
app.use(express.bodyParser());
app.use(validator);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Map requests
(function(a, route){
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // '/path': { ... }
      case 'object':
        arguments.callee(a[key], route + key);
        break;
      // verb: function(){ ... }
      case 'function':
        app[key](new RegExp('^' + route.replace(/\//g, '\\/') + '$'), a[key]);
        break;
    }
  }
})(routes);

// Start the server
app.listen(config.server.port, config.server.host);

console.log('> Ticketless running at ' + config.server.host + ':' + config.server.port);