var ticket = require('./routes/ticket.js'),
    event  = require('./routes/event.js'),
    venue  = require('./routes/venue.js')
    user   = require('./routes/user.js');

/* Double escape back-slashes! */
var routes = {
  '/ticket': {
    post: ticket.add,
    '/(\\d+)': {
      get: ticket.get,
      '/offer': {
        post: ticket.offer
      },
      '/edit': {
        put: ticket.edit
      }
    }
  },
  '/event': {
    '/(\\d+)': {
      get: event.get,
      '/tickets': {
        get: event.tickets
      },
      '/edit': {
        put: event.edit
      }
    }
  },
  '/venue': {
    '/(\\d+)': {
      get: venue.get,
      '/tickets': {
        get: venue.tickets
      },
      '/edit': {
        put: venue.edit
      }
    }
  },
  '/user': {
    post: user.add,
    '/(\\d+)': {
      get: user.get,
      '/tickets': {
        get: user.tickets
      },
      '/offers': {
        get: user.offers
      },
      '/edit': {
        put: user.edit
      }
    }
  },
  '/admin': {
    post: user.add,
    '/(\\d+)': {
      get: user.get,
      '/tickets': {
        get: user.tickets
      },
      '/offers': {
        get: user.offers
      },
      '/edit': {
        put: user.edit
      }
    }
  }

};

module.exports = routes;