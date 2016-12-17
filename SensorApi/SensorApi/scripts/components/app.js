var app = angular.module("app", [
    "ngRoute",
    "appControllers"
]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/main", {
            templateUrl: "partials/main.html"
        })
        .when("/addRoom", {
            templateUrl: "partials/addRoom.html"
        })
        .when("/roomData/:id", {
            templateUrl:"partials/roomData.html"
        })
        .otherwise({
            redirectTo:"/main"
        });


}]);

