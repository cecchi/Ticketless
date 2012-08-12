var config  = require('./config.js');
    mysql   = require('mysql'),
    squel   = require('squel'),
    schemas = require('./schemas.js');

var db = mysql.createConnection(config.database);
db.connect(function(err) {
  if(err) {
    console.log(err);
  }
});

db.squel = squel;
db.schemas = schemas;

// Return basic queries as a multidimensional object
db.queryMap = function(sql, callback) {
  db.query({
    'sql' : sql.toString(),
    'nestTables' : true
  }, function(err, results) {
    if(err) {
      callback(err, results);
      return;
    }

    var wheres = sql.wheres.map(function(clause, index, array) {
      if(fields = clause.match(/^((?:[^\s\.]+\.?){2,})\s*=\s*((?:[^\s\.]+\.?){2,})$/)) {
        return { 'left' : fields[1].split('.'), 'right' : fields[2].split('.') };
      } else { 
        return false;
      }
    }).filter(function(element) {
      return element !== false;
    }).sort(function(a, b) {
      return a[0] == b[b.length - 1] ? 1 : -1
    });

    results.forEach(function(row) {
      wheres.forEach(function(expr) {
        row[expr.left[0]][expr.left[1]] = row[expr.right[0]];
      });
      wheres.forEach(function(expr) {
        delete row[expr.right[0]];
      });
    });

    callback(err, results);
  });
}

module.exports = db;