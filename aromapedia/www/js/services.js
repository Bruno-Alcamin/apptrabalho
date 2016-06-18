angular.module('starter.services', [])

.value("Config",{
    getURL:"https://aromapedia-bruno-alcamin.c9users.io/"
})

.service('LoginService', function($http,Config){
      
    this.getData = function(username,password){
         return  $http({
          method: 'POST',
          url: Config.getURL+'login/logar',
          headers : {'Content-Type':"application/json"},
          data: {'login':username, 'senha':password},
        })
    };
    
    this.sendSenha = function(contato){
        return $http({
            method: 'POST',
            url: Config.getURL+'clientes/enviarEmail',
            headers : {'Content-Type':"application/json"},
            data: {'email': contato}
        })
    }
})

.service('ProdutoService', function($http,Config){
    
    this.getData = function(){
         return $http({
            method: 'GET',
            url: Config.getURL+'produto/buscaProduto',
            dataType: "json",
            cache: false,
            headers : {'Content-Type':"application/json"},
        })
    };
    
    this.pesqData = function(params){
        return $http({
            method: 'GET',
            url: Config.getURL+'produto/buscanomeProduto?arg0='+params,
            dataType: "json",
            cache: false,
            headers : {'Content-Type':"application/json"},
        })
    }
})

.service('DicasService', function($http,Config){
    
    this.getData = function(){
         return $http({
            method: 'GET',
            url: Config.getURL+'dicas/buscaDicas',
            dataType: "json",
            cache: false,
            headers : {'Content-Type':"application/json"},
        })
    };
})


.service('CadastroService', function($http,Config){
     this.getData = function(nome,endereco,email,senha,senhacript,telefone,celular){
         return  $http({
            method: 'POST',
            url: Config.getURL+'clientes/cadastro',
            headers : {'Content-Type':"application/json"},
            data: {'nome':nome, 'endereco':endereco, 'email':email, 'senha':senha, 'senhacript':senhacript, 'telefone':telefone, 'celular':celular},
        });
     };
})

.service('HomeService', function($http,Config){
    this.getData = function(token){
        return $http({
        method: 'GET',
        url: Config.getURL+'login/logout?arg1='+token,
        });
    }
})

.service('ValidaService', function($http,Config){
     this.getData = function(token){
        return $http({
        method: 'GET',
        url:  Config.getURL+'login/verificatoken?arg1='+token,
        })
     }
})


.service('PatrocinadoresService', function($http,Config){
    this.getData = function(){
        return $http({
        method: 'GET',
        url:  Config.getURL+'patrocinadores/getimagens',
        })
    }
});