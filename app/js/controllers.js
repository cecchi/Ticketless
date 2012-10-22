function MainCtrl($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$routeParams = $routeParams;
  $scope.$location = $location;
}
function IndexCtrl($scope, $routeParams) {
  $scope.name = 'index';
  $scope.breadcrumb = [];
  $scope.categories = Categories.query();
}
function TicketsCtrl($scope, $routeParams) {
  $scope.name = 'tickets';
  $scope.breadcrumb = ['Home', 'Tickets'];
}
function EventCtrl($scope, $routeParams, Event) {
  $scope.name = 'event';
  $scope.breadcrumb = ['Sports', 'Football', 'Patriots', 'Vs. Ravens'];
  $scope.tickets = Events.query();
}