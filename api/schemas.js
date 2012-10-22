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
    'seats',
    'price'
  ],
  'users' : [
    '*'
  ],
  'offers' : [
    'price'
  ],
  'categories' : [
    'id',
    'name'
  ]
}

module.exports = function(table, alias) {
  return alias + '.' + schemas[table].join(', ' + alias + '.');
}