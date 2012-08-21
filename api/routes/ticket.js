var db   = require('../database.js'),
    rest = require('../rest.js');

var ticket = {};

ticket.add = function(req, res) {

  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check('event', 'Invalid event ID').isInt();
  req.check('section', 'Invalid section').is(/^[A-Za-z0-9_-]+$/);
  req.check('row', 'Invalid row').isInt();
  req.check('seats', 'Invalid seat').is(/^(\d+,?)*\d$/);
  req.check('seller', 'Invalid ticket ID').isInt();
  req.check('price', 'Invalid ticket ID').isDecimal();
  req.sanitize('available', 'Invalid availability').toBoolean();
  req.sanitize('negotiable', 'Invalid negotiability').toBoolean();

  if(req.validationErrors()) {
    return;
  }

  var sql = db.squel.insert()
    .into('tickets')
    .set('event', req.body.event)
    .set('section', req.body.section)
    .set('row', req.body.row)
    .set('seats', req.body.seats)
    .set('seller', req.body.seller)
    .set('price', req.body.price)
    .set('available', req.body.available)
    .set('negotiable', req.body.negotiable)
    .toString();

  db.query(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      req.params = [results.insertId];
      ticket.get(req, res);
    }
  });
}

ticket.update = function(req, res) {

  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check('id', 'Invalid user ID').isInt();
  req.check('phone', 'Invalid 10-digit phone number').len(10,10).isInt();

  var sql = db.squel.update()
    .table(db.schemas('users', 'user'))
    .set('user.phone', req.body.phone)
    .where('user.id = ' + req.body.id)

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

ticket.get = function(req, res) {

  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid ticket ID').isInt();

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

  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid ticket ID').isInt();
  req.check('amount', 'Invalid offer amount').isDecimal();

  var sql = db.squel.insert()
    .into('offers')
    .set('ticket', req.params[0])
    .set('amount', req.body.amount)
    .toString();

    console.log(sql);

  db.query(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      req.params = [results.insertId];
      ticket.get(req, res, results);
    }
  });

}

module.exports = ticket;