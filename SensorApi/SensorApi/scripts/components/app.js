var app = angular.module("app", [
    "ngRoute",
    "appControllers"
]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/main", {
            templateUrl: "partials/main.html",
            controller: "MainController"
        })
        .when("/sensorData", {
            templateUrl: "partials/sensorData.html",
            controller: "SensorController"
        })
        .otherwise({
            redirectTo:"/main"
        });


}]);

