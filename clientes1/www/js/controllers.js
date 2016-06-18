angular.module('app.controllers', [])
  
.controller('clientesCtrl', function($scope) {
    $(listar());
    
    $('button[id="clientes-button2"]').click(function(){
        var model = {"nome" : $('input[name="nome"]').val(),"telefone" : $('input[name="telefone"]').val()};
        $.ajax({
            type: 'POST',
            dataType: "json",
            cache: false,
            contentType:"application/json",
            url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/cadastro',
            data: JSON.stringify(model),
        }).done(function(e){
            var itens = "";
            itens+='<div class="item item-body " id="clientes-list-item-container1">';
            itens+='<ion-list id="page-list2" disable-user-behavior><div class="list"><ion-item id="page-list-item2" class="  item">';
            itens+='Nome: ';
            itens+=e.nome;
            itens+="</ion-item>"
            itens+="</div></ion-list>";
            itens+='<ion-list id="page-list2" disable-user-behavior><div class="list"><ion-item id="page-list-item2" class="  item">';
            itens+='Valor: ';
            itens+=e.telefone;
            itens+="</ion-item>";
            itens+="</div></ion-list>";
            itens+='</div>';
            $('div[id="clientes-list-item-container1"]').append(itens);
            $('input[name="nome"]').val("");
            $('input[name="telefone"]').val("");    
            });
    });


    function listar(){
    var itens = "";
    $.ajax({
        type: 'GET',
        dataType: "json",
        cache: false,
        contentType:"application/json",
        url: 'https://inoboxconde-bruno-alcamin.c9users.io/home/listaClientes',
    }).done(function(e){
        alert(e);
         for(var i = 0; i<e.length; i++){
            itens+='<div class="item item-body " id="clientes-list-item-container1">';
            itens+='<ion-list id="page-list2" disable-user-behavior><div class="list"><ion-item id="page-list-item2" class="  item">';
            itens+='Nome: ';
            itens+=e[i].nome;
            itens+="</ion-item>"
            itens+="</div></ion-list>";
            itens+='<ion-list id="page-list2" disable-user-behavior><div class="list"><ion-item id="page-list-item2" class="  item">';
            itens+='Valor: ';
            itens+=e[i].telefone;
            itens+="</ion-item>";
            itens+="</div></ion-list>";
            itens+='</div>';
        }
        $('div[id="clientes-list-item-container1"]').append(itens);
    });
}
        
})
 