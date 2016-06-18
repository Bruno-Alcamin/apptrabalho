angular.module('app.controllers', ['ionic'])
  
.controller('clientesCtrl', function($scope, $http) {
    $scope.textoList = "Listar Todos";


    $scope.listar = function(){   
        $http({
            method: 'GET',
            url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/listaClientes',
            dataType: "json",
            cache: false,
            contentType:"application/json",
        }).success(function(retorno){
                $scope.lista = retorno;    
                $scope.items;
        });
    };

    $scope.model = {"nome" : "","telefone" : ""};
    
        
    $scope.onItemAdd = function(){     
        $http({
            method: 'POST',
            url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/cadastro',
            headers : {'Content-Type':"application/json"},
            data: {'nome':$scope.model.nome, 'telefone':$scope.model.telefone},
        });
        $scope.model.nome = "";
        $scope.model.telefone = "";
    };

    
        
});
