angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$ionicModal, $timeout,$http) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

 
 $scope.logout = function(){
   var token = window.sessionStorage.getItem('token');
    $http({
        method: 'GET',
        url: 'https://inoboxconde-bruno-alcamin.c9users.io/login/logout?arg1='+token,
      }).success(function(){
          window.sessionStorage.setItem('token',undefined);
          $scope.modal.show();
          $scope.loginData.username="";
          $scope.loginData.password="";
      });
 }

})

.controller('PlaylistsCtrl', function($scope,$http) {
  
  $scope.playlists = [];
  
  
  $http({
        method: 'GET',
        url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/getCategorias',
        
      }).success(function(retorno){
          $scope.playlists = retorno;
    });
  
})


.controller('ValidaCtrl', function($scope, $stateParams,$http) {
  
  var token = window.sessionStorage.getItem('token');
    //alert(token);
  
    $http({
        method: 'GET',
        url: 'https://inoboxconde-bruno-alcamin.c9users.io/login/verificatoken?arg1='+token,
        
      }).success(function(retorno){
          if(!retorno){
            $scope.modal.show();
          }
    });
  
})

.controller('loginCtrl', function($scope, $stateParams,$http,$state) {
  
  if(!window.sessionStorage.getItem('token'))
     window.sessionStorage.setItem('token',undefined);
     
     
     $scope.logon = function(){
   $http({
      method: 'POST',
      url: 'https://inoboxconde-bruno-alcamin.c9users.io/login/logar',
      headers : {'Content-Type':"application/json"},
      data: {'login':$scope.loginData.username, 'senha':$scope.loginData.password},
    }).success(function(retorno){
      
          window.sessionStorage.setItem('token',retorno.token);
          if(retorno.token!=undefined){
            $scope.loginData.username="";
            $scope.loginData.password="";
            $scope.textErro = "";
            $scope.nome = retorno.nome ;
            $state.go('playlists');
          }else{
            $scope.textErro = "senha ou login incorreto!";
          }
    });
 };
 

});