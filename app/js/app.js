var ticketless = angular.module('ticketless', ['ticketlessServices']);

ticketless.
  config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl : 'partials/index.html',
        controller  : IndexCtrl
      }).
      when('/tickets', {
        templateUrl : 'partials/tickets.html',
        controller  : TicketsCtrl
      }).
      when('/events/:eventId', {
        templateUrl : 'partials/event.html', 
        controller  : EventCtrl
      }).
      otherwise({redirectTo: '/'});
  });