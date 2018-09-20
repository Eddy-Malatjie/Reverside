angular.module("AngularModule.controllers", [])

//*********************************************************************************************************************  
  //  Controllers
//*********************************************************************************************************************

//Home Controller
.controller("HomeController", function ($rootScope, $scope, $location)
{
    $scope.EnterAddress = function () {
        $location.path('/SearchResults');
        $rootScope.SearchedAddress = $scope.Address.SearchAddress;
        console.log($rootScope.SearchedAddress);
    }

})
//Search Result Controller
.controller("SearchResultController", function ($scope, $rootScope, $location) {
    $scope.message = "search ";

    $scope.Results = function () {
        $location.path('/SearchResults');
        alert($rootScope.SearchedAddress);
    }

})
//RegisterCustomerController
.controller("RegisterCustomerController", function ($scope, RegisterUserService, $location) {
    $scope.message = "Enter your details my boy!";

    $scope.AddUser = function () {
        RegisterUserService.addUserToDB($scope.customer);
        alert("You are successfully registered");
        $location.path('/Home')
    }

})
//RegisterRestaurantController
.controller("RegisterRestaurantController", function ($scope, RegisterRestaurantService, $location, $rootScope) {
    $scope.message = "RegisterRestaurant works";
    $rootScope.isRegRestPage = false;
    console.log($rootScope.isRegRestPage);
    $scope.pageLoad = function () {
        $rootScope.isRegRestPage = true;
        console.log($rootScope.isRegRestPage);
    }
    console.log($rootScope.isRegRestPage);
    $scope.AddRestaurant = function () {
        console.log($scope.restaurant);
        RegisterRestaurantService.AddRestaurantToDB($scope.restaurant);
        $location.path('/Home')
    }

})
//RegisterDriverController
.controller("RegisterDriverController", function ($scope, RegisterDriverService, $location) {
    $scope.message = "Register Driver works";
    $scope.isRegDrvPage = true;

    $scope.AddDriver = function () {
        console.log($scope.driver);
        RegisterDriverService.AddDriverToDB($scope.driver);
        $location.path('/Home')
    }
})
//LoginCustomerController
.controller("LoginCustomerController", function ($scope, $http, GetRestaurantService, GetDriverService ,LoginUserService, $rootScope, $location) {

    $scope.message = "Login controller!";
    var ValidUser = false;
    $rootScope.isLoggedIn = false;

    // var x;

    $scope.LoginUser = function () {

        GetDriverService.getDriver().then(function(d) {
            $scope.Driver = d.data;
        })
        LoginUserService.getUser().then(function (d) {
            $scope.Customer = d.data;
        })
        GetRestaurantService.getRestaurant().then(function(d){
            $scope.Restaurant = d.data;
        })
       
            /*for(var j=0; j < $scope.Driver.length; j++) {
                if ($scope.Login.Email == $scope.Driver[i].Email && $scope.Login.Password == $scope.Driver[i].Password) {
                    ValidUser = true;
                    var x = i;
                    var userName = $scope.Customer[x].FName + ' ' + $scope.Customer[x].LName;
                    var userEmail = $scope.Customer[x].Email;
                }
            }*/
            for(var j=0; j < $scope.Restaurant.length; j++) {
                if ($scope.Login.Email == $scope.Restaurant[i].Email && $scope.Login.Password == $scope.Restaurant[i].Password) {
                    ValidUser = true;
                    var x = i;
                    var userName = $scope.Customer[x].FName + ' ' + $scope.Customer[x].LName;
                    var userEmail = $scope.Customer[x].Email;
                }
            }
            for (var i = 0; i < $scope.Customer.length; i++) {
                if ($scope.Login.Email == $scope.Customer[i].Email && $scope.Login.Password == $scope.Customer[i].Password) {
                    ValidUser = true;
                    var x = i;
                    var userName = $scope.Customer[x].FName + ' ' + $scope.Customer[x].LName;
                    var userEmail = $scope.Customer[x].Email;
                }
            }

            console.log($rootScope.isLoggedIn);
            if (ValidUser) {
                $rootScope.isLoggedIn = true;

                
                console.log($rootScope.isLoggedIn);
                $rootScope.CurrentUserName = userName;
                $rootScope.CurrentUserEmail = userEmail;
                alert("Welcome back ");
                $location.path('/Home');
            }
            else {
                alert("incorrect");
            }
        
    }
})
//Admin Dashboard controller
.controller("AdminDashboardController", function ($scope, UpdateDriverService, $filter, $http, $location, UpdateRestaurantService, GetRestaurantService, GetDriverService, LoginUserService, DeleteUserService) {

    $scope.message = "You are on admin dashboard";
    $scope.restBtn = "Show Restaurants";
    $scope.drvBtn = "Show Drivers"
    $scope.custBtn = "Show Customers"
   
    //Get Restaurant Details
    $scope.ResDetails = function () {
        $scope.restBtn = "Loading";
        GetRestaurantService.getRestaurant().then(function (d) {   
            $scope.AllRestaurants = d.data;
            $scope.Restaurants = $filter('filter')($scope.AllRestaurants, { Status: 'pending'});
            console.log($scope.Restaurants);

            var button = document.getElementById('btnRes');
            button.style.visibility = 'hidden';
        })
    }
    //Get Driver Details
    $scope.DrvDetails = function () {
        $scope.drvBtn = "Loading";
        GetDriverService.getDriver().then(function (d) {
            $scope.AllDrivers = d.data;
            console.log($scope.AllDrivers);
            $scope.Drivers = $filter('filter')($scope.AllDrivers, { Status: 'pending' });

            console.log($scope.Drivers);
            var button = document.getElementById('btnDrv');
            button.style.visibility = 'hidden';

        })
    }
    //Get Customer Details
    $scope.CustDetails = function () {
        $scope.custBtn = "Loading";
        LoginUserService.getUser().then(function (d) {
            $scope.Customers = d.data;
            console.log($scope.Customers);



            var button = document.getElementById('btnCust');
            button.style.visibility = 'hidden';
        })
    }
    //Delete A User
    $scope.DelUser = function (id) {
              
       DeleteUserService.deleteUser(id);
        LoginUserService.getUser().then(function (d) {
            $scope.Customers = d.data;
            console.log($scope.Customers);
            
        })

    }
    //Approve Restaurant
    $scope.ApproveRes = function (id,restaurant)
    {
        console.log(id);
        console.log(restaurant);
        restaurant.Status = 'Approved';
        UpdateRestaurantService.EditRestaurant(restaurant);
        alert("Copy point of contact's Email Address:" + restaurant.Email);

    }
    $scope.ApproveDrv = function (id,driver)
    {
        console.log(driver);
        driver.Status = 'Approved';
        UpdateDriverService.EditDriver(driver);
        alert("Copy Driver's Email Address:" + driver.Email);
    }
})
//Restaurant owner Dashboard Controller
.controller("RODashboardController", function ($scope, RegisterProductService, GetProductService, DeleteProductService, UpdateProductService, $http) {

    $scope.update = true;
    $scope.btnModify = 'Modify';
    $scope.message = "Restaurant Owner Works";

    //Add A New Product
    $scope.AddProduct = function () {
        console.log($scope.product);
        RegisterProductService.addProductToDB($scope.product);
        alert("You have successfully added a new product!");
        location.reload();
    }
    //Show/Display All Products
    $scope.prodDetails = function () {
           
            GetProductService.getProduct().then(function (d) {
                $scope.Products = d.data;
                console.log(d.data);

                var button = document.getElementById('btnProd');
                button.style.visibility = 'hidden';
            })
    }
    //Enable Update Mode
    $scope.UpdateProd = function () {
        
        $scope.btnModify = 'Save';
        $scope.update = false;
           
    }
    //Edit and Modify Products
    $scope.edit = function(id,product) {
    // UpdateProductService.updateProduct(id, product)
        console.log(id);
        console.log(product);

        UpdateProductService.EditCustomer(product);
        $scope.btnModify = 'Modify';
        $scope.update = true;
        location.reload();
        alert("Menu Items Updated");
    }
    //Delete a product
    $scope.DeleteProd = function (id) {
      
        DeleteProductService.deleteProduct(id);
        console.log("Deleted I guess");
        GetProductService.getProduct().then(function (d) {
        $scope.Products = d.data;

        })

    }
})
//Manage Driver controller
.controller("ManageDriversController", function ($scope, UpdateDriverService, $filter, $http, $location, GetDriverService) {

    $scope.message = "You are on admin dashboard";
    $scope.drvBtn = "Show Drivers"

    //Get Driver Details
    $scope.DrvDetails = function () {
        $scope.drvBtn = "Loading";
        GetDriverService.getDriver().then(function (d) {
            $scope.AllDrivers = d.data;
            console.log($scope.AllDrivers);
            $scope.Drivers = $filter('filter')($scope.AllDrivers, { Status: 'pending' });

            console.log($scope.Drivers);
            var button = document.getElementById('btnDrv');
            button.style.visibility = 'hidden';

        })
    }
    //Approve Driver application
    $scope.ApproveDrv = function (id, driver) {
        console.log(driver);
        driver.Status = 'Approved';
        UpdateDriverService.EditDriver(driver);
        alert("Copy Driver's Email Address:" + driver.Email);
    }
})
//Manage Restaurants controller
.controller("ManageRestaurantsController", function ($scope, $filter, $http, $location, UpdateRestaurantService, GetRestaurantService) {

    $scope.message = "You are on admin dashboard";
    $scope.restBtn = "Show Restaurants";
   
    //Get Restaurant Details
    $scope.ResDetails = function () {
        $scope.restBtn = "Loading";
        GetRestaurantService.getRestaurant().then(function (d) {
            $scope.AllRestaurants = d.data;
            $scope.Restaurants = $filter('filter')($scope.AllRestaurants, { Status: 'pending' });
            console.log($scope.Restaurants);

            var button = document.getElementById('btnRes');
            button.style.visibility = 'hidden';
        })
    }
    //Approve Restaurant
    $scope.ApproveRes = function (id, restaurant) {
        console.log(id);
        console.log(restaurant);
        restaurant.Status = 'Approved';
        UpdateRestaurantService.EditRestaurant(restaurant);
        alert("Copy point of contact's Email Address:" + restaurant.Email);

    }

})
//Manage Users controller 
.controller("ManageUsersController", function ($scope, $filter, $http, $location, LoginUserService, DeleteUserService) {

    $scope.message = "Manage Users";
    $scope.custBtn = "Show Customers"


    //Get Customer Details
    $scope.CustDetails = function () {
        $scope.custBtn = "Loading";
        LoginUserService.getUser().then(function (d) {
            $scope.Customers = d.data;
            console.log($scope.Customers);

            var button = document.getElementById('btnCust');
            button.style.visibility = 'hidden';
        })
    }
    //Delete A User
    $scope.DelUser = function (id) {

        DeleteUserService.deleteUser(id);
        LoginUserService.getUser().then(function (d) {
            $scope.Customers = d.data;
            console.log($scope.Customers);

        })

    }


})

//*********************************************************************************************************************  
  //FACTORIES
//*********************************************************************************************************************

//*********************************************************************************************************************  
  //GET
//*********************************************************************************************************************

//LoginUserService/Get Customers from Database
.factory("LoginUserService", ['$http', function ($http) {

    var fac = {};

    fac.getUser = function () {
        return $http.get('api/Customers');
    }
    return fac;

}])

//Update Restaurant in database
.factory("PutRestaurantService", ['$http', function ($http) {

    var fac = {};

    fac.putRestaurant = function () {
        return $http.get('api/Drivers');
    }
    return fac;
}])

//Return Resturant from database
.factory("GetRestaurantService", ['$http', function ($http) {

    var fac = {};

    fac.getRestaurant = function () {
        return $http.get('api/Restaurants');
    }
    return fac;
}])


//*********************************************************************************************************************  
  //POST  
//*********************************************************************************************************************

//RegisterUserService
.factory("RegisterUserService", ['$http', function ($http) {

    var fac = {};

    fac.addUserToDB = function (customer) {
        $http.post("api/Customers", customer)
    }
    return fac;
}])

//RegisterDriverService/Insert Drivers into the database
.factory("RegisterDriverService", ['$http', function ($http) {

    var fac = {};

    fac.AddDriverToDB = function (driver) {
        $http.post("api/Drivers", driver)
    }

    return fac;
}])

//RegisterRestaurantService/Insert Restauarants into the database
.factory("RegisterRestaurantService", ['$http', function ($http) {

    var fac = {};

    fac.AddRestaurantToDB = function (restaurant) {
        $http.post("api/Restaurants", restaurant)
    }

    return fac;
}])

//Return products from database
.factory("GetProductService", ['$http', function ($http) {

    var fac = {};

    fac.getProduct = function () {
        return $http.get('api/Products');
    }
    return fac;
}])

//Return Driver from database
.factory("GetDriverService", ['$http', function ($http) {

    var fac = {};

    fac.getDriver = function () {
        return $http.get('api/Drivers');
    }
    return fac;
}])

//RegisterRestaurantService/Insert Restauarants into the database
.factory("RegisterProductService", ['$http', function ($http) {

    var fac = {};

    fac.addProductToDB = function (product) {
        $http.post("api/Products", product)
    }
    return fac;
}])

//*********************************************************************************************************************  
  //PUT
//*********************************************************************************************************************

//Update Product from database
.factory("UpdateProductService", ['$http', function ($http) {

    var fac = {};

    fac.EditCustomer = function (custToEdit) {
        var datta = $http({
            method: 'PUT',
            url: 'api/Products/' + custToEdit.Id,
            data: custToEdit
        });
    }
    return fac;
}])

//Update Restaurant from database
.factory("UpdateRestaurantService", ['$http', function ($http) {

    var fac = {};

    fac.EditRestaurant = function (restToEdit) {
        var datta = $http({
            method: 'PUT',
            url: 'api/Restaurants/' + restToEdit.Id,
            data: restToEdit
        });
    }
    return fac;
}])

//Update Restaurant from database
.factory("UpdateDriverService", ['$http', function ($http) {

    var fac = {};

    fac.EditDriver = function (driverToEdit) {
        var datta = $http({
            method: 'PUT',
            url: 'api/Drivers/' + driverToEdit.Id,
            data: driverToEdit
        });
    }
    return fac;
}])

//*********************************************************************************************************************  
  //DELETE
//*********************************************************************************************************************

//Delete Customer from database
.factory("DeleteUserService", ['$http', function ($http) {

    var fac = {};

    fac.deleteUser = function (CustomerId) {
        console.log(CustomerId);
        return $http.delete('api/Customers/' + CustomerId);
    }
    return fac;
}])

//Delete Product from Database
.factory("DeleteProductService", ['$http', function ($http) {

    var fac = {};

    fac.deleteProduct = function (ProductId) {
        return $http.delete('api/Products/' + ProductId);
    }
    return fac;
}])

