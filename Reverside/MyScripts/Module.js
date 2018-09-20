var app = angular.module("AngularModule", ["AngularModule.controllers", "ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
  
    $routeProvider.
                when("/", {
                    templateUrl: "/Pages/home.html",
                    controller: "HomeController"

                }).
                 when("/AddUser", {
                     templateUrl: "/Pages/RegisterCustomer.html",
                     controller: "RegisterCustomerController"
                 }).
                 when("/LoginUser", {
                     templateUrl: "/Pages/LoginCustomer.html",
                     controller: "LoginCustomerController"
                 }).
                 when("/AddRestaurant", {
                     templateUrl: "/Pages/RegisterRestaurant.html",
                     controller: "RegisterRestaurantController"
                 }).
                when("/AddDriver", {
                    templateUrl: "/Pages/RegisterDriver.html",
                    controller: "RegisterDriverController"
                }).
                when("/Admin", {
                    templateUrl: "/Pages/AdminDashboard.html",
                    controller: "AdminDashboardController"
                }).
                when("/RestaurantOwner", {
                    templateUrl: "/Pages/RestaurantOwnerDashboard.html",
                    controller: "RODashboardController"
                }).
                when("/ManageUsers", {
                    templateUrl: "/Pages/ManageUsers.html",
                    controller: "ManageUsersController"
                }).
                when("/ManageRestaurants", {
                    templateUrl: "/Pages/ManageRestaurants.html",
                    controller: "ManageRestaurantsController"
                }).
                when("/ManageDrivers", {
                    templateUrl: "/Pages/ManageDrivers.html",
                    controller: "ManageDriversController"
                }).
                 when("/SearchResults", {
                     templateUrl: "/Pages/SearchResult.html",
                     controller: "SearchResultController"
                 }).
    otherwise({ redirectTo: "/" })
}]);
