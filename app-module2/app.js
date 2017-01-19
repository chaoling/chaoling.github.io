(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyListController', ToBuyListController)
.controller('AlreadyBoughtListController', AlreadyBoughtListController)
.service('ShoppingListService',ShoppingListService);

//ShoppingListService.$inject = ['ShoppingListService'];
ToBuyListController.$inject = ['ShoppingListService'];
AlreadyBoughtListController.$inject = ['ShoppingListService'];
function ToBuyListController(ShoppingListService) {
  var TBC = this;
  TBC.toBuyItems = ShoppingListService.getItems();
  TBC.onBoughtBtnClick = function (index) {
    console.log("Bought Btn clicked!"+TBC.toBuyItems[index].name);
    ShoppingListService.addBoughtItem(TBC.toBuyItems[index].name,
      TBC.toBuyItems[index].quantity);
    ShoppingListService.removeItem(index);
  };
}

function AlreadyBoughtListController(ShoppingListService) {
  var ABC = this;
  ABC.boughtItems = ShoppingListService.getBoughtItems();
  console.log("boughtItems: "+ABC.boughtItems.name);
}

function ShoppingListService() {
  var service = this;
  // List of shopping items
  var items = [
    {name:'Cookies', quantity:'10'},
    {name:'Chips', quantity: '5'},
    {name:'Cokes', quantity: '12'}
  ];
  // List of boughtItems
  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    service.items.push(item);
  };

  service.getItems = function() {
    return items;
  };

  service.removeItem = function (index) {
    items.splice(index, 1);
  }
  service.addBoughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
    //console.log("boughtItems: "+item);
  };
  service.getBoughtItems = function() {
    return boughtItems;
  };
  service.removeBoughtItem = function (index) {
    boughtItems.splice(index, 1);
  };
}
})();
