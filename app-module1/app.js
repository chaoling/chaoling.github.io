(function () {
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.message = "";
  $scope.lunchItems = "";
  $scope.onBtnClick = function () {
    if ($scope.lunchItems == "") {
      $scope.message="Please enter data first";
    } else {
      var arrayOfItems = $scope.lunchItems.split(',');
      //onsole.log(arrayOfItems);
      if (numOfItems(arrayOfItems) <= 3) {
        $scope.message="Enjoy!";
      } else {
        $scope.message="Too much!";
      }
    }
  };

  function numOfItems(items) {
    var res = 0;
    for (var i in items){
      //console.log(items[i]);
      if (items[i] != "") {
        res++;
      }
    }
    //console.log(res);
    return res;
  }
}

})();
