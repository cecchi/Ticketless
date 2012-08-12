/* Ticketless */

var config    = require('./config.js'),
    routes    = require('./routes.js'),
    express   = require('express'),
    validator = require('express-validator');

// Create REST-ful servers
var app = express();
app.use(validator);

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

/*
// GET /ticket/:ticket_id
app.get(/^\/ticket\/(\d+)\/?$/, function(req, res) {
  var sql = squel.select()
    .field('ticket.*')
    .field('event.*')
    .field('venue.*')
    .field('user.*')
    .from('tickets', 'ticket')
    .from('events', 'event')
    .from('venues', 'venue')
    .from('users', 'user')
    .where('ticket.id = ' + req.params[0])
    .where('ticket.event = event.id')
    .where('event.venue = venue.id')
    .where('ticket.seller = user.id')
    .group('event.id')
    .toString();

  console.log('QUERY >> ' + sql);

  db.query({
    'sql' : sql,
    'nestTables' : true
  }, function(err, rows) {
    if(err) {
      console.log(err);
      res.send('<h1>MySQL Error: </h1>' + JSON.stringify(err));
    } else {
      res.send(JSON.stringify(rows));
    }
  });
});

// GET /event/{event_id}
app.get(/^\/event\/(\d+)\/?$/, function(req, res) {
  res.send('<h1>Info for event ' + req.params[0] + '</h1>');
});

// GET /event/{event_id}/tickets
app.get(/^\/event\/(\d+)\/tickets\/?$/, function(req, res) {
  var sql = squel.select()
    .field('ticket.*')
    .field('event.*')
    .field('venue.*')
    .field('user.*')
    .from('tickets', 'ticket')
    .from('events', 'event')
    .from('venues', 'venue')
    .from('users', 'user')
    .where('ticket.event = event.id')
    .where('event.id = ' + req.params[0])
    .where('event.venue = venue.id')
    .where('ticket.seller = user.id')
    .toString();

  console.log('QUERY >> ' + sql);

  db.query({
    'sql' : sql,
    'nestTables' : true
  }, function(err, rows) {
    if(err) {
      console.log(err);
      res.send('<h1>MySQL Error: </h1>' + JSON.stringify(err));
    } else {
      res.send(JSON.stringify(rows));
    }
  });
});

// GET /venue/{venue_id}
app.get(/^\/venue\/(\d+)\/?$/, function(req, res) {
  res.send('<h1>Info for venue ' + req.params[0] + '</h1>');
});

// GET /venue/{venue_id}/tickets
app.get(/^\/venue\/(\d+)\/tickets\/?$/, function(req, res) {
  var sql = squel.select()
    .field('ticket.*')
    .field('event.*')
    .field('venue.*')
    .field('user.*')
    .from('tickets', 'ticket')
    .from('events', 'event')
    .from('venues', 'venue')
    .from('users', 'user')
    .where('venue.id = ' + req.params[0])
    .where('ticket.event = event.id')
    .where('event.venue = venue.id')
    .where('ticket.seller = user.id')
    .toString();

  console.log('QUERY >> ' + sql);

  db.query({
    'sql' : sql,
    'nestTables' : true
  }, function(err, rows) {
    if(err) {
      console.log(err);
      res.send('<h1>MySQL Error: </h1>' + JSON.stringify(err));
    } else {
      res.send(JSON.stringify(rows));
    }
  });
});

app.get('/*', function(req, res) {
  res.send('<h1>Ticketless</h1>');
})
*/

// Start the server
app.listen(config.server.port, config.server.host);

console.log('> Ticketless running at ' + config.server.host + ':' + config.server.port);