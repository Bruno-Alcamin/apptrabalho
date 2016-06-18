angular.module('app.controllers', [])
  
.controller('clientesCtrl', function($scope) {
    $scope.textoList = "Listar Todos";
    $scope.listar = function(){
        $.ajax({
            type: 'GET',
            dataType: "json",
            cache: false,
            contentType:"application/json",
            url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/listaClientes',
            success:function(e){
                $scope.lista = e;    
                $scope.items;
            }
        });
    };

    $scope.model = {"nome" : "","telefone" : ""};
    
    $scope.onItemAdd = function() {
        console.log($scope.model.nome);
        console.log($scope.model.telefone);
        $.ajax({
            type: 'POST',
            dataType: "json",
            cache: false,
            contentType:"application/json",
            url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/cadastro',
            data: JSON.stringify($scope.model),
            success:function(e){
                $scope.lista = e;    
                $scope.items;
                $scope.textoList = "Listar Todos";
            }
        });
        $scope.textoList = "Listar Inserido";
        $scope.model.nome = "";
        $scope.model.telefone = "";
    };

    
        
})
 