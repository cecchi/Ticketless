var schemas = {
  'events' : [
    'id',
    'name',
    'category',
    'description',
    'time'
  ],
  'venues' : [
    'name',
    'latitude',
    'longitude'
  ],
  'tickets' : [
    'id',
    'section',
    'row',
    'price'
  ],
  'users' : [
    '*'
  ],
  'offers' : [
    'price'
  ]
}

module.exports = function(table, alias) {
  return alias + '.' + schemas[table].join(', ' + alias + '.');
}