var app = angular.module('shareLink', ['ngRoute','naif.base64'])


  app.config(function($routeProvider, $locationProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "main.html"
      })

       .when("/listlinks", {
              templateUrl : "listlinks.html"
       })
       .when("/addlink", {
                       templateUrl : "addlink.html"
       })
       .when("/login", {
                       templateUrl : "login.html"
       })
       .when("/profile", {
                       templateUrl : "profile.html"
       })
       .when("/signup", {
                       templateUrl : "signup.html"
       })
       .otherwise({
               template : "index.html"
       });

});

app.controller('shareLinkController', function($location,$http) {
    var shareLink = this;

    shareLink.links = [];
    
    shareLink.link = {
      link:"",
      img:{},
      description:"",
      rate:5,
      tag:""
    };

    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/plus.login');

    shareLink.authGoogle = function() {

    firebase.auth().signInWithPopup(provider).then(function(authData) {

            window.location = '#/listlinks';

        }).catch(function(error) {
            alert ("Login ou senha incorretos");
        });

    };

    shareLink.getLinks = function() {

      $http.get('http://localhost:8080/link').success(function(dados) {
        shareLink.links = dados._embedded.link;
      });      

    };

    shareLink.getImage = function(image) {
      
      return 'data:image/jpeg;base64,' + image;
    };

    shareLink.postLink = function() {

    shareLink.link.img = shareLink.link.img.base64;      

      $http.post('http://localhost:8080/link',shareLink.link).success(function(dados) {

        window.location = '#/listlinks';
        
      });      

    };

});