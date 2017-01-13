(function () {
  'use strict';
  var app = angular.module("PasswordGen",[]);
  app.controller("PasswordController", PasswordController);

  PasswordController.$inject = ['$scope'];

  function PasswordController($scope) {
    $scope.datetime="";
    $scope.serialnum="";
    $scope.message = "";
    $scope.genPassword = function () {
      if ($scope.datetime == "" || $scope.serialnum == "") {
        $scope.message = "Please Enter Data First"
      } else {
        $scope.message = "Password is: ".concat(passwdGen($scope.datetime,$scope.serialnum));
      }
    }
  };

  function passwdGen(data,salt) {
    console.log("data is: ".concat(data));
    console.log("salt is: ".concat(salt));
    var res = "";
    var hash = md5(data+salt);
    console.log("hash var is "+hash);
    hash = hash.slice(0,8);
    console.log("first 4 bytes are: "+hash);
    var testval = Number.parseInt(hash,16);
    console.log("test var: "+testval);
    res = "".concat(testval);
    return res;
  }
})();
