(function () {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'tic',
      bindToController: true
    };
    return ddo;
  }


  function FoundItemsDirectiveController() {
    var tic = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var ndc = this;
    //console.log("inside NarrowItDownController");
    ndc.items = [];
    var origTitle = "Found Items:"
    //var origTitle = "Found Menu List #1";
    ndc.title = origTitle + " (" + ndc.items.length + " items )";
    ndc.onBtnClick = function () {
      console.log("ndc Btn clicked! "+ndc.searchTerm);
      var promise = MenuSearchService.getMatchedMenuItems(ndc.searchTerm);
      promise.then(function(response) {
        console.log("result: "+response);
        ndc.items = response;
        //ndc.title = origTitle + " (" + ndc.items.length + " items )";
      })
      .catch(function (error) {
        console.log("Something went wrong."+error.message);
      });
    };

    ndc.removeItem = function(index) {
      console.log("remove item: ");
      ndc.items.splice(index,1);
      ndc.title = origTitle + " (" + ndc.items.length + " items )";
    };
  }

  MenuSearchService.$inject=['$http', 'ApiBasePath'];
  function MenuSearchService($http,ApiBasePath) {
    var service = this;

    //var foundItems = [];//[{"id":877,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart"},
    //{"id":878,"short_name":"A2","name":"Egg Drop Soup","description":"chicken broth with egg drop","price_small":2.25,"price_large":4.5,"small_portion_name":"pint","large_portion_name":"quart"}];
    service.getMatchedMenuItems = function(searchTerm) {
      var service = this;
      console.log("searchTerm: "+searchTerm);
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });
      return promise.then(function (response) {
        console.log(response.data['menu_items']);
        var menuItems = response.data['menu_items'];
        var foundItems = [];
        console.log("items length: "+menuItems.length);
        for (var key in menuItems) {
          if (menuItems.hasOwnProperty(key)) {
            //console.log(menuItems[key].name);
            //console.log(menuItems[key].description);
            if(menuItems[key].description.indexOf(searchTerm) != -1) {
               //service.found.push(menuItems[key]);
               console.log("searched :"+menuItems[key].name);
               foundItems.push(menuItems[key]);
             }
          }
        }
        console.log("foundItems: "+foundItems);
        return foundItems;
      });
    };
  }
})();
