var db   = require('../database.js'),
    rest = require('../rest.js'),
    _    = require('underscore');

var category = {};

category.get = function(req, res) {
  
  req.onValidationError(function(msg) {
    rest.error(req, res, msg);
  });

  if(typeof req.params[0] != 'undefined') {
    req.check(0, 'Invalid category ID').isInt();
  }

  var sql = db.squel.select()
    .field(db.schemas('categories', 'parent'))
    .field(db.schemas('categories', 'child'))
    .field(db.schemas('categories', 'grandchild'))
    .field(db.schemas('events', 'event'))
    .from('categories', 'child')
    .left_join('categories', 'parent', 'child.lineage LIKE CONCAT(parent.lineage, \'_%\')')
    .left_join('categories', 'grandchild', 'grandchild.parent = child.id')
    .left_join('events', 'event', 'event.category = child.id')
    .order('parent.lineage');

  if(typeof req.params[0] != 'undefined') {
    sql.where('child.id = ' + req.params[0])
  } else {
    sql.where('child.id IS NULL')
  }

  console.log(sql.toString());

  db.query({
    'sql' : sql.toString(),
    'nestTables' : true
  }, function(err, results) {
    if(err) {
      rest.error(req, res, err);
    } else if(!results.length) {
      rest.error(req, res, 'Invalid category ID');
    } else {

      results = {
        lineage : _.uniq(results.map(function(row) {
          return row.parent;
        }).filter(function(category) {
          return category.id !== null;
        }), true, function(category) {
          return category.id
        }).concat([results[0].child]),

        children : _.uniq(results.map(function(row) {
          return row.grandchild;
        }).filter(function(category) {
          return category.id !== null;
        }), false, function(category) {
          return category.id
        }),

        events : _.uniq(results.map(function(row) {
          return row.event;
        }).filter(function(event) {
          return event.id !== null;
        }), false, function(event) {
          return event.id
        })
      };


      rest.success(req, res, results);
      return;
      rest.success(req, res, {
        lineage : results.map(function(category) {
          return category.parent.name;
        }).filter(function(category) {
          return category !== null;
        }),
        details : (results.length ? results.slice(-1)[0].child : {})
      });
    }
  });
}

module.exports = category;