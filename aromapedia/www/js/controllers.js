angular.module('starter.controllers', ['angular-md5'])


.controller('LoginCtrl', function($scope, $ionicPopup, $location, $ionicLoading, LoginService,$state,$ionicListDelegate,md5) {

    if(!window.sessionStorage.getItem('token'))
     window.sessionStorage.setItem('token',undefined);
     $scope.loginData = {};
     
     $scope.logon = function(){
      LoginService.getData($scope.loginData.username,md5.createHash($scope.loginData.password)).success(function(retorno){
          
              window.sessionStorage.setItem('token',retorno.cd_token_usuario);
              if(retorno.cd_token_usuario!=undefined&&retorno!=false){
                $scope.loginData.username="";
                $scope.loginData.password="";
                $state.go('tab.home');
              }else{
                $ionicPopup.show({
                    title: "Senha ou login incorreto ! Lembrando que sua conta deve ser aprovada pelo Administrado.",
                    buttons: [
                          {
                             text: '<b>Ok</b>',
                             type: 'button-royal',
                           }
                    ]
                });  
              }
        });
     };


    $scope.EsqueciSenha = function(){
        $scope.data = {"email": ''};
        $ionicPopup.show({
            title: "Envio de Email",
            scope: $scope,
            template: "<input type='text' placeholder='Email' autofocus='true' ng-model='data.email'>",
            buttons: [
                {text: "Ok",
                type: 'button-royal',
                    onTap: function(e) {
                        var x = $scope.data.email;
                        EnviaSenha(x)}},
                {text: "Cancel",type: 'button-royal',}
            ]
        });
        $ionicListDelegate.closeOptionButtons();
    };
    
    function EnviaSenha(contato){
        //alert(contato);
        LoginService.sendSenha(contato).success(function(e){
                console.log(e);
        });
    }
})

.controller('HomeCtrl', function($scope,HomeService,$state){

     $scope.logout = function(){
        var token = window.sessionStorage.getItem('token');
        HomeService.getData(token).success(function(){
              window.sessionStorage.setItem('token',undefined);
              $state.go('login');
        });
    }
})

.controller('cadastroCtrl', function($scope,CadastroService,$state, md5){

    $scope.model = {"nome" : "", "endereco" : "", "email" : "", "senha" : "", "telefone" : "", "celular" : "" };
    
    $scope.cadastro = function(){     
        var senhacript = md5.createHash($scope.model.senha);
        CadastroService.getData($scope.model.nome,$scope.model.endereco,$scope.model.email,$scope.model.senha,senhacript,$scope.model.telefone,$scope.model.celular);
        $state.go('login');
    };

})

.controller('BuscaCtrl', function($scope,$ionicPopup,ProdutoService){
    invgetAll();
    function invgetAll(){
        document.querySelector("#btn-pesq").style.display = "none";
    }
    
    $scope.pesq = {"chave":""};
    
    $scope.$watch('$viewContentLoaded',function () {
       ProdutoService.getData().success(function(e){
                invgetAll();
                $scope.lista = e;
        });
    });
    
    $scope.getAll = function(){
        ProdutoService.getData().success(function(e){
                $scope.pesq.chave = "";
                invgetAll();
                $scope.lista = e;
        });
    }
    
    $scope.pesquisa = function(){
        
        ProdutoService.pesqData($scope.pesq.chave).success(function(e){
            if(e.length>0){
                document.querySelector("#btn-pesq").style.display = "block";
                $scope.lista = e; 
            }else{
                $scope.pesq.chave = "";
                $ionicPopup.show({
                    title: "Nenhum Resultado !",
                    buttons: [
                        {text: "Ok",type: 'button-royal',}
                    ]
                });
            }
        });
    };
    

})

.controller('DicasCtrl', function($scope,DicasService,$location,$ionicModal){
    
    $ionicModal.fromTemplateUrl('templates/detalhes.html',{
        
        scope:$scope,
        animation:'slide-in-up'
        
    }).then(function(modal){
        $scope.modal = modal;
    });
    
    $scope.abreModal = function(){
        $scope.modal.show();
    };
    
    $scope.fechaModal = function(){
        $scope.modal.hide();
    };
    
    $scope.$watch('$viewContentLoaded',function () {
        DicasService.getData().success(function(e){
                $scope.lista = e; 
        });
    });
    
    $scope.detalhesDica = function(id){
        $scope.dicas = $scope.lista.filter(function(element){
            return element.cd_dicas == id;
        });
      // console.log($scope.dicas);
    };
    
    $scope.btnAleatorio = function(){
        function ajusteZero(){ var n = (Math.floor(Math.random() * $scope.lista.length)); if(n==0){return n+1;}else{return n;}}; 
        $scope.detalhesDica(ajusteZero());
        $scope.abreModal();
    };
})

.controller('PatrocinadoresCtrl', function($scope,PatrocinadoresService){
    PatrocinadoresService.getData().success(function(e){
        $scope.lista = e; 
    });
});

