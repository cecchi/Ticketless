var db   = require('../database.js'),
    rest = require('../rest.js');

var ticket = {};

ticket.add = function(req, res) {
  res.send('<h1>ticket.add</h1>');
}

ticket.update = function(req, res) {
  res.send('<h1>ticket.update</h1>');
}

ticket.get = function(req, res) {

  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid ticket ID').len(1,1);

  if(req.validationErrors()) {
    return;
  }

  var sql = db.squel.select()
    .field(db.schemas('tickets', 'ticket'))
    .field(db.schemas('events', 'event'))
    .field(db.schemas('venues', 'venue'))
    .field(db.schemas('users', 'seller'))
    .from('tickets', 'ticket')
    .from('events', 'event')
    .from('venues', 'venue')
    .from('users', 'seller')
    .where('ticket.id = ' + req.params[0])
    .where('ticket.event = event.id')
    .where('event.venue = venue.id')
    .where('ticket.seller = seller.id')
    .group('event.id');

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

ticket.offer = function(req, res) {
  res.send('<h1>ticket.offer</h1>');
}

module.exports = ticket;