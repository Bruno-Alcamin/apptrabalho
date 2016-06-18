angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.tabs.style("standard");

})

.config(function($stateProvider, $urlRouterProvider) {
  

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  
  .state('cadastro', {
    url: '/cadastro',
    cache: false,
    templateUrl: 'templates/cadastro.html',
    controller: 'cadastroCtrl'
  })

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('tab.home', {
    resolve : { myResolve1: function(ValidaService,$state){
      var token = window.sessionStorage.getItem('token');
      return ValidaService.getData(token).success(function(retorno){
          if(!retorno){
            $state.go('login');
          }
      })
     }
    },
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    },
  })
  
  .state('tab.busca', {
    resolve : { myResolve1: function(ValidaService,$state){
      var token = window.sessionStorage.getItem('token');
      return ValidaService.getData(token).success(function(retorno){
          if(!retorno){
            $state.go('login');
          }
      })
     }
    },
    url: '/busca',
    cache: false,
    views: {
      'tab-busca': {
        templateUrl: 'templates/tab-busca.html',
        controller: 'BuscaCtrl'
      }
    }
  })
  
  .state('tab.dicas', {
     resolve : { myResolve1: function(ValidaService,$state){
      var token = window.sessionStorage.getItem('token');
      return ValidaService.getData(token).success(function(retorno){
          if(!retorno){
            $state.go('login');
          }
      })
     }
    },
    url: '/dicas',
    views: {
      'tab-dicas': {
        templateUrl: 'templates/tab-dicas.html',
        controller: 'DicasCtrl'
      }
    }
  })
  


  .state('tab.patrocinadores', {
     resolve : { myResolve1: function(ValidaService,$state){
      var token = window.sessionStorage.getItem('token');
      return ValidaService.getData(token).success(function(retorno){
          if(!retorno){
            $state.go('login');
          }
      })
     }
    },
    url: '/patrocinadores',
    views: {
      'tab-patrocinadores': {
        templateUrl: 'templates/tab-patrocinadores.html',
        controller: 'PatrocinadoresCtrl'
      }
    }
  })
  
  
  .state('tab.dicas.detalhes', {
    url: '/detalhes',
    templateUrl: 'templates/detalhes.html',
  });

  $urlRouterProvider.otherwise('/login');

});
