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
       .when("/testeindex", {
                       templateUrl : "testeindex.html"
       })
       .when("/testelistlinks", {
                       templateUrl : "testelistlinks.html"
       })
       .when("/testeaddlink", {
                       templateUrl : "testeaddlink.html"
       })
       .when("/index2", {
                       templateUrl : "index2.html"
       })
       .when("/sobre", {
                       templateUrl : "sobre.html"
       })
       .when("/hotlinks", {
                       templateUrl : "hotlinks.html"
       })
       .when("/contato", {
                       templateUrl : "contato.html"
       })
       .when("/slides", {
                       templateUrl : "slides.html"
       })
     
       .otherwise({
               template : "index.html"
       });

});

app.controller('shareLinkController', function($location,$http,$rootScope) {
    var shareLink = this;

    shareLink.links = [];
    shareLink.linksDestaque  = [];
    
    shareLink.link = {
      link:"",
      img:{},
      description:"",
      ownerEmail:"",
      rate:5,
      rateQnt:1,
      tag:""
    };

    shareLink.orderByWhat = 'link';

    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/plus.login');

    shareLink.authGoogle = function() {

    firebase.auth().signInWithPopup(provider).then(function(authData) {
            $rootScope.user=authData.user;

            window.location = '#/listlinks';

        }).catch(function(error) {
            window.location = '#/';
            alert ("Login ou senha incorretos");
        });

    };

    shareLink.getLinks = function() {

      $http.get('http://localhost:8080/link').success(function(dados) {
        shareLink.links = dados._embedded.link;
        angular.forEach(shareLink.links, function(linkTemp){
          linkTemp.hover=false;
        });

      });      

    };
    shareLink.orderBy = function(newOrder) {
      shareLink.orderByWhat = newOrder;
    };

    shareLink.delete = function(item) {
      $http.delete(item._links.link.href).success(function() {
        for (var i = shareLink.links.length - 1; i >= 0; i--) {
          if(shareLink.links[i]._links.link.href == item._links.link.href){
            shareLink.links.splice(i,1);
            break;
          }
        }

      });   
    };

    shareLink.getUser = function() {

      return $rootScope.user;    

    };

    shareLink.getImage = function(image) {
      
      return 'data:image/jpeg;base64,' + image;
    };

    shareLink.postLink = function() {

    shareLink.link.img = shareLink.link.img.base64;
    shareLink.link.ownerEmail = $rootScope.user.email;      

      $http.post('http://localhost:8080/link',shareLink.link)
      .success(function(dados) {

        window.location = '#/listlinks';
        
      });      

    };

});