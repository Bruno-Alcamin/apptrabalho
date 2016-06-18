angular.module('starter.services', [])


.factory('BlankFactory', function($http){ 
    
   function log(a,b){
    return $http({ 
      method: 'POST',
      url: 'https://inoboxconde-bruno-alcamin.c9users.io/login/logar',
      headers : {'Content-Type':"application/json"},
      data: {'login':a, 'senha':b},
    }).success(function(retorno){
          window.sessionStorage.setItem('token',retorno.token);
          if(retorno.token!=undefined){
            //$scope.closeLogin();
          }else{
           // $scope.textErro = "senha ou login incorreto!";
          }
    });
    }
    return{log: log};
})

.service('BlankService', [function(){
    
}]);

