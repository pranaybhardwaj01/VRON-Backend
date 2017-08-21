angular.module('myApp', ['ngMaterial', 'ngRoute', "smart-table", "ngMap", "firebase"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/login",{templateUrl: "partials/login.html"})
            .when("/main",{templateUrl: "partials/main.html"})
            .when("/map", { templateUrl: "partials/map.html" })
            .when("/user", { templateUrl: "partials/user.html" })
            .when("/adduser", { templateUrl: "partials/adduser.html" })
            .when("/addbus", { templateUrl: "partials/addbus.html" })
            .when("/addroute", { templateUrl: "partials/addroute.html" })
            .otherwise({ templateUrl: "partials/login.html" })
    })


//------------------------------------------------------------------------------
.controller("sidenav", function($location) {
    sidenavCtrl = this;
    sidenavCtrl.busaddColor = sidenavCtrl.useraddColor = sidenavCtrl.userColor = sidenavCtrl.routeaddColor = 'primary';
    sidenavCtrl.busColor = 'warn';
    sidenavCtrl.bus = function() {
        $location.path("/map");
        sidenavCtrl.busaddColor = sidenavCtrl.useraddColor = sidenavCtrl.userColor = sidenavCtrl.routeaddColor = 'primary';
        sidenavCtrl.busColor = 'warn';
    }

    sidenavCtrl.user = function() {
        $location.path("/user");
        sidenavCtrl.busaddColor = sidenavCtrl.useraddColor = sidenavCtrl.busColor = sidenavCtrl.routeaddColor = 'primary';
        sidenavCtrl.userColor = 'warn';
    }

    sidenavCtrl.useradd = function() {
        $location.path("/adduser");
        sidenavCtrl.busaddColor = sidenavCtrl.busColor = sidenavCtrl.userColor = sidenavCtrl.routeaddColor = 'primary';
        sidenavCtrl.useraddColor = 'warn';
    }

    sidenavCtrl.busadd = function() {
        $location.path("/addbus");
        sidenavCtrl.busColor = sidenavCtrl.useraddColor = sidenavCtrl.userColor = sidenavCtrl.routeaddColor = 'primary';
        sidenavCtrl.busaddColor = 'warn';
    }

    sidenavCtrl.routeadd = function() {
        $location.path("/addroute");
        sidenavCtrl.busColor = sidenavCtrl.useraddColor = sidenavCtrl.userColor = sidenavCtrl.busaddColor = 'primary';
        sidenavCtrl.routeaddColor = 'warn';
    }
})


//------------------------------------------------------------------------------

.controller('adduser', function($firebaseArray,$firebaseAuth,$timeout, $mdToast) {
    adduserCtrl = this;
    var auth = $firebaseAuth();
    var userRef = firebase.database().ref("Users");
    adduserCtrl.users = $firebaseArray(userRef);
    var studentRef = userRef.child("Student");
    adduserCtrl.students = $firebaseArray(studentRef)
    var driverRef = userRef.child("Driver");
    adduserCtrl.drivers = $firebaseArray(driverRef)
    var busRef = firebase.database().ref("Buses");
    var buses=$firebaseArray(busRef);
    adduserCtrl.route = null;
    adduserCtrl.routes = null;
    var routeRef = firebase.database().ref("Routes");
    var routes = $firebaseArray(routeRef);
    console.log(routes)

    adduserCtrl.createUser = function() {
            auth.$createUserWithEmailAndPassword(adduserCtrl.email, adduserCtrl.password)
                .then(function(firebaseUser) {
                    var flaguser = true;
                    var user = firebase.auth().currentUser;
                    var obj = {};
                     console.log(adduserCtrl.type.name);
                    if(adduserCtrl.type.name=="Driver")
                    {
                         obj.name = adduserCtrl.name;
                         obj.id = adduserCtrl.Id;
                         obj.email = firebaseUser.email;
                         obj.img = "https://firebasestorage.googleapis.com/v0/b/vron-skit.appspot.com/o/dplogo.JPG?alt=media&token=c0f8eb06-17e1-4279-976b-d8b7423a95ba";
                         obj.route=adduserCtrl.route;
                         obj.phone=adduserCtrl.phoneNo;
                         obj.busno=adduserCtrl.busNo;
                         adduserCtrl.drivers.$add(obj);
                         console.log(adduserCtrl.users);
                    }
                        //obj.type.name
                    else if(adduserCtrl.type.name=="Student")
                    {
                        obj.name = adduserCtrl.name;
                        obj.id = adduserCtrl.Id;
                        obj.email = firebaseUser.email;
                        obj.img = "https://firebasestorage.googleapis.com/v0/b/vron-skit.appspot.com/o/dplogo.JPG?alt=media&token=c0f8eb06-17e1-4279-976b-d8b7423a95ba";
                        obj.route=adduserCtrl.route;
                        obj.year=adduserCtrl.year;
                        adduserCtrl.students.$add(obj);
                        console.log(adduserCtrl.users);
                    }         

                    // for (i = 0; i < adduserCtrl.users.length; i++) {
                    //     if (adduserCtrl.email == adduserCtrl.users[i].email) {
                    //         flaguser = false;
                    //     }
                    // }
                    // if (flaguser)
                    //     adduserCtrl.users.$add(obj);
                    // console.log(adduserCtrl.users);
                    
                }).catch(function(error) {
                    console.error("Error: ", error);
                });

        }

    adduserCtrl.loadRoutes = function() {

        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

            adduserCtrl.routes = routes;

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

            adduserCtrl.buses = buses;

        }, 65);
    };


    adduserCtrl.showSimpleToast = function() {


        $mdToast.show(
            $mdToast.simple()
            .textContent('User Added')
            .position("bottom right")
            .hideDelay(3000)
        );
    };
})

//------------------------------------------------------------------------------

.controller('addbus', function($firebaseArray,$mdToast, $timeout) {
    addbusCtrl = this;

    var busRef = firebase.database().ref("Buses");
    addbusCtrl.buses=$firebaseArray(busRef);

    var routeRef = firebase.database().ref("Routes");
    var routes = $firebaseArray(routeRef);
    var driverRef = firebase.database().ref("Users").child("Driver");
    var drivers = $firebaseArray(driverRef)
    addbusCtrl.addBus = function() {
    var obj = {};
    obj.busNo= addbusCtrl.busNo;
    obj.driver= addbusCtrl.driver.name;
    obj.route= addbusCtrl.route.name;
    addbusCtrl.buses.$add(obj);
    addbusCtrl.busNo="";
    }


    addbusCtrl.loadAllDrivers = function() {
        return $timeout(function() {

            addbusCtrl.drivers = drivers;

        }, 65);
    }

    addbusCtrl.route = null;
    addbusCtrl.routes = null;

    addbusCtrl.loadRoutes = function() {

        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

            addbusCtrl.routes = routes;
        }, 65);
    };

    addbusCtrl.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent('Bus Added')
            .position("bottom right")
            .hideDelay(3000)
        );
    };
    console.log(addbusCtrl.buses);
})




//------------------------------------------------------------------------------


.controller('user', function($firebaseArray,$timeout) {
    userCtrl = this;
    var studentRef = firebase.database().ref("Users").child("Student");
    var students = $firebaseArray(studentRef)
    var driverRef = firebase.database().ref("Users").child("Driver");
    var drivers = $firebaseArray(driverRef)

      
    // for(i=0;i<users.length;i++)
    // console.log(users[i]);
    userCtrl.students = students;

    userCtrl.drivers = drivers;
        
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


//------------------------------------------------------------------------------
.controller('map', function(NgMap, $mdBottomSheet, $mdToast) {
    mapCtrl = this;
    mapCtrl.isOpen = false;

    mapCtrl.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };
})

//------------------------------------------------------------------------------

.controller('addroute', function($firebaseArray,$mdToast) {
    addrouteCtrl = this;
    var routeRef = firebase.database().ref("Routes");
    addrouteCtrl.routes = $firebaseArray(routeRef);
    addrouteCtrl.createroute = function(){
        console.log(addrouteCtrl.routeName)
    var routesobj = {};
    routesobj.id=addrouteCtrl.routeId;
    routesobj.name=addrouteCtrl.routeName;
    addrouteCtrl.routes.$add(routesobj);
    addrouteCtrl.routeId="";
    addrouteCtrl.routeName="";
    }
    // addrouteCtrl.routes = [
    //     { id: 1, name: 'Jhotwara-Sodala-Jagatpura' },
    //     { id: 2, name: 'Vidaydhar Nagar-Chinkara-Tok Road-Jagatpura' },
    //     { id: 3, name: 'Fred Jones' },
    //     { id: 4, name: 'Daphne Blake' }
    // ];

    addrouteCtrl.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent('Route Added')
            .position("bottom right")
            .hideDelay(3000)
        );
    };
})
.controller("loginCtrl",loginCtrl)
function loginCtrl($firebaseAuth,$location){
     var auth = $firebaseAuth();
    login=this;
    login.signIn = function() {
            var promise = auth.$signInWithEmailAndPassword(login.email, login.password);
            console.log("signIN");
            promise
                .then(function(firebaseUser) {
                   $location.path("/main");
                }).catch(function(error) {
                    console.log(error.message);
                })
    }
}