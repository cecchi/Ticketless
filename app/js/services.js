var ticketlessServices = angular.module('ticketlessServices', ['ngResource']);

ticketlessServices.
  factory('Events', function($resource, Config) {
    return $resource(Config.api + '/event/:eventId/tickets', {}, {
      query: {
        method: 'GET',
        isArray: false,
        params:  {
          eventId : '1'
        }
      }
    });
  }).
  factory('Categories', function($resource, Config) {
    return $resource(Config.api + '/', {}, {
      query: {
        method: 'GET'
      }
    });
  }).
  factory('Config', function() {
    return {
      api : 'http://api.ticketless.dev'
    };
  }).
  factory('API', function() {
    var api;
    api.event = $resource(Config.api + '/event/:eventId', {}, {
        query: {
          method: method,
          isArray: isArray,
          params: params
        }
      })
    }
    // function(method, isArray, endpoint, params) {
  });