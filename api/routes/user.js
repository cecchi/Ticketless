var db     = require('../database.js'),
    rest   = require('../rest.js');

var user = {};

user.add = function(req, res) {

  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check('phone', 'Invalid 10-digit phone number').len(10,10).isInt();

  if(req.validationErrors()) {
    return;
  }

  var sql = db.squel.insert()
    .into(db.schemas('users', 'user'))
    .set('user.phone', req.body.phone)
    .toString();

  db.query(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      req.params = [results.insertId];
      user.get(req, res);
    }
  });
}

user.update = function(req, res) {

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

user.get = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid user ID').isInt();

  var sql = squel.select()
    .field(db.schemas('users', 'user'))
    .from('users', 'user')
    .where('user.id = ' + req.params[0]);

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

user.tickets = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid user ID').isInt();

  var sql = squel.select()
    .field(db.schemas('tickets', 'ticket'))
    .field(db.schemas('users', 'seller'))
    .from('tickets', 'ticket')
    .from('users', 'seller')
    .where('ticket.seller = seller.id')
    .where('seller.id = ' + req.params[0]);

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

user.offers = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  req.check(0, 'Invalid user ID').isInt();

  var sql = squel.select()
    .field(db.schemas('offers', 'offer'))
    .from('offers', 'offer')
    .where('offer.id = ' + req.params[0]);

  db.queryMap(sql, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else {
      rest.success(req, res, results);
    }
  });
}

module.exports = user;