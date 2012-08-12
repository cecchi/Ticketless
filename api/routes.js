var ticket = require('./routes/ticket.js'),
    event  = require('./routes/event.js'),
    venue  = require('./routes/venue.js')

/* Double escape back-slashes! */
var routes = {
  '/ticket': {
    post: ticket.add,
    put: ticket.update,
    '/(\\d+)': {
      get: ticket.get
    },
    '/offer/(\\d+)': {
      post: ticket.offer
    }
  },
  '/event': {
    '/(\\d+)': {
      get: event.get,
      '/tickets': {
        get: event.tickets
      }
    }
  },
  '/venue': {
    '/([\\d\\s]+)': {
      get: venue.get,
      '/tickets': {
        get: venue.tickets
      }
    }
  }
};

module.exports = routes;