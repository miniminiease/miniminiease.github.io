var app = angular.module('me', []);

/* Controllers */
app
.controller('MainCtrl', ['$scope', '$location', '$compile', '$filter', MainCtrl]);

/* Directives */
app
.directive('include', ['$window', function($window) {
   return {
      restrict: 'A',
      link: function( scope, element, attrs ) {
         var placeElement = function() {
            $(element).removeAttr('style');
            var w = $window.innerWidth;
            var w_ele = $(element).innerWidth();
            var margin = w_ele < w ? Math.floor( (w - w_ele)/2 ) : 0;
            $(element).css({
               'margin-right': margin + 'px',
               'margin-left': margin + 'px'
            });
         };
         angular.element($window).bind('resize', placeElement);
         placeElement();
      }
   };
}]);
