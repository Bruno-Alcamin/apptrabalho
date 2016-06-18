angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Bom dia a todos',
    lastText: 'Bom dia a todos, com patchouli e mandarina fresca, para equilibrar e revitalizar as energias.',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Dor de Ouvido',
    lastText: '1 gota de camomila romana ou azul em 20 gotas de óleo vegetal de copaíba - passar no lado externo do ouvido.',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Acne 1',
    lastText: '1 gota de tea tree pra 10 gotas de óleo vegetal de calêndula!. Embeber numa bolinha de algodão e fechar com micropore sobre a acne, depois de limpar a região com hidrolato de alecrim, gerânio, lavanda ou tea tree.',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Acne 2',
    lastText: 'óleo vegetal de copaíba, metade tea tree e metade lavanda, diluído em 2%.',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Manchas da pele 1',
    lastText: 'OE de palmarosa 4 gotas, lavanda francesa 5 gotas, gel de aloe vera 1,5 ml, argila branca 0,8 gramas, base gel Bio Essência 12,2 gramas. Diluir na base nesta ordem: gel de aloe vera, óleos essenciais, argila. Pote de 15 gramas.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
