var db      = require('../database.js'),
    rest    = require('../rest.js');

var offer = {};

offer.add = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check('ticket', 'Invalid ticket ID').isInt();
  req.check('amount', 'Invalid offer amount').isDecimal();

  var sql = db.squel.insert()
    .into(db.schemas('offers', 'offer'))
    .set('offer.ticket', req.body.ticket)
    .set('offer.amount', req.body.amount)
    .toString();

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      req.params = [results.insertId];
      offer.get(req, res, results);
    }
  });
}

offer.get = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid offer ID').isInt();

  var sql = db.squel.select()
    .field(db.schemas('offers', 'offer'))
    .from('offers', 'offer')
    .where('offer.id = ' + req.params[0])

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

module.exports = offer;