angular.module('app.controllers', ['ionic'])
  
.controller('clientesCtrl', function($scope, $http,$ionicPopup, $ionicListDelegate) {
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

    function onEdit(contato){  
        alert(contato.cd_Cliente);
        alert(contato.nm_Cliente);
        alert(contato.cd_TelefoneCliente);
        $http({
            method: 'POST',
            url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/update',
            headers : {'Content-Type':"application/json"},
            data: {'id': contato.cd_Cliente,'nome':$contato.nm_Cliente, 'telefone':$contato.cd_TelefoneCliente},
        });
    };

    $scope.onItemEdit = function(items) {

        getItem(items);
    };

    function getItem(items) {
        $scope.data = {"id": 0 ,"nome" : "","telefone" : ""};
        $scope.data.id = items.cd_Cliente;
        $scope.data.nome = items.nm_Cliente;
        $scope.data.telefone = items.cd_TelefoneCliente;
        $ionicPopup.show({
            title: "Editar Contato",
            scope: $scope,
            template: "<input type='text' placeholder='Nome' autofocus='true' ng-model='data.nome'><br><input type='text' placeholder='telefone' autofocus='true' ng-model='data.telefone' >",
            buttons: [
                {text: "Ok",
                    onTap: function(e) {
                        items.nm_Cliente = $scope.data.nome;
                        items.cd_TelefoneCliente = $scope.data.telefone;
                        onEdit(items);
                }},
                {text: "Cancel"}
            ]
        });
        
        $ionicListDelegate.closeOptionButtons();
    };

        
});
