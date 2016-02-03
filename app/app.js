(function(){
    var contactFormApp = angular.module('contactFormApp', ['ngRoute', 'ui.router'])

        .config(function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('views/getUser.html');
            $stateProvider
                .state('home',{
                    url: "/",
                    templateURL: "views/getUsers.html",
                    controller:''
                })
                .state('users',{
                    url:"/users",
                    templateURL:"views/users.html",
                    controller:''
                });
        });

})();