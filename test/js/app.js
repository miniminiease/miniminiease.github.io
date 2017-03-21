var app = angular.module('me', []);

/* Controllers */
app
.controller('MainCtrl', ['$scope', '$location', '$compile', '$filter', MainCtrl]);
