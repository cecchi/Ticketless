var db   = require('../database.js'),
    rest = require('../rest.js');

var venue = {};

venue.get = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid venue ID').isInt();

  var sql = db.squel.select()
    .field(db.schemas('venues', 'venue'))
    .from('venues', 'venue')
    .where('venue.id = ' + req.params[0])

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

venue.tickets = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid venue ID').isInt();

  var sql = db.squel.select()
    .field(db.schemas('tickets', 'ticket'))
    .field(db.schemas('events', 'event'))
    .field(db.schemas('venues', 'venue'))
    .field(db.schemas('users', 'seller'))
    .from('tickets', 'ticket')
    .from('events', 'event')
    .from('venues', 'venue')
    .from('users', 'seller')
    .where('ticket.event = event.id')
    .where('event.venue = venue.id')
    .where('venue.id = ' + req.params[0])
    .where('ticket.seller = seller.id');

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

module.exports = venue;