angular.module('myApp', ['ngMaterial', 'ngRoute', "smart-table"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/map", { templateUrl: "partials/map.html" })
            .when("/user", { templateUrl: "partials/user.html" })
            .when("/adduser", { templateUrl: "partials/adduser.html" })
            .when("/addbus", { templateUrl: "partials/addbus.html" })
            .otherwise({ templateUrl: "partials/map.html" })
    })
    .controller("sidenav", function($location) {
        sidenavCtrl = this;
        sidenavCtrl.bus = function() {
            $location.path("/map");
        }
        sidenavCtrl.user = function() {
            $location.path("/user");
        }
        sidenavCtrl.useradd = function() {
            $location.path("/adduser");
        }
        sidenavCtrl.busadd = function() {
            $location.path("/addbus");
        }
    })

.controller('adduser', function($timeout, $mdToast) {
    adduserCtrl = this;

    adduserCtrl.route = null;
    adduserCtrl.routes = null;

    adduserCtrl.loadRoutes = function() {

        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

            adduserCtrl.routes = adduserCtrl.routes || [
                { id: 1, name: 'Jhotwara-Sodala-Jagatpura' },
                { id: 2, name: 'Vidaydhar Nagar-Chinkara-Tok Road-Jagatpura' },
                { id: 3, name: 'Fred Jones' },
                { id: 4, name: 'Daphne Blake' }
            ];

        }, 65);
    };
    adduserCtrl.type = null;
    adduserCtrl.types = null;

    adduserCtrl.loadTypes = function() {

        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

            adduserCtrl.types = adduserCtrl.types || [
                { id: 1, name: 'Student' },
                { id: 2, name: 'Driver' }
            ];

        }, 65);
    };

    adduserCtrl.bus = null;
    adduserCtrl.buses = null;

    adduserCtrl.loadBuses = function() {

        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

            adduserCtrl.buses = adduserCtrl.buses || [
                { id: 1, no: '1' },
                { id: 2, no: '2' },
                { id: 3, no: '3' },
                { id: 4, no: '4' },
                { id: 5, no: '5' },
                { id: 6, no: '6' },
                { id: 7, no: '7' },
                { id: 8, no: '8' }
            ];

        }, 65);
    };


    adduserCtrl.showSimpleToast = function() {


        $mdToast.show(
            $mdToast.simple()
            .textContent('user Added')
            .position("bottom right")
            .hideDelay(3000)
        );
    };
})

.controller('addbus', function() {
    addbusCtrl = this;


})

.controller('user', function($timeout) {
    userCtrl = this;
    userCtrl.students = [
        { name: 'Peeyush', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Pranay', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Hitendra', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Peeyush', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Pranay', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Hitendra', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Peeyush', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Pranay', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Hitendra', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Peeyush', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Pranay', id: '22210', email: 'xyz@yahoo.in' },
        { name: 'Hitendra', id: '22210', email: 'xyz@yahoo.in' }
    ];

    userCtrl.itemsByPage = 10;

    userCtrl.loadAllUsers = function() {
        return $timeout(function() {

            userCtrl.allUsers = userCtrl.allUsers || [
                { name: "Student" },
                { name: "Driver" }
            ];

        }, 65);

    }
})

.controller('map', function() {
    mapCtrl = this;

})