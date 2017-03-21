var MainCtrl = function($scope, $location, $compile, $filter) {
   $scope.setShow = function( _item ) {
      for(var i=0; i<$scope.menu_items.length; ++i) {
         $scope.menu_items[i].show = false;
      }
      _item.show = true;
   };

   /* Private */
   function init() {
      $scope.menu_items = [
         {  key: 'about',
            show: false },
         {  key: 'brands',
            show: false },
         {  key: 'online_shop',
            show: false },
         {  key: 'contact',
            show: false }
      ];
   }

   /* Init */
   init();
}
