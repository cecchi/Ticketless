var rest = {};

rest.error = function(req, res, error) {
  console.log(error);
  res.json({
    'success' : false,
    'error'   : error,
    'results' : []
  });
}

rest.success = function(req, res, results) {
  res.json({
    'success' : true,
    'error'   : null,
    'results' : results
  });
}

module.exports = rest;