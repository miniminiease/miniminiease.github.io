var MainCtrl = function($scope, $location, $compile, $filter) {
   $scope.setShow = function( _item ) {
      if(_item.show) _item.show = false;
      else {
         for(var i=0; i<$scope.menu_items.length; ++i) {
            $scope.menu_items[i].show = false;
         }
         _item.show = true;
      }
   };

   /* Private */
   function init() {
      $scope.menu_items = [
         {  key: 'about',
            display: 'about',
            show: false },
         {  key: 'brands',
            display: 'brands',
            show: false },
         {  key: 'online_shop',
            display: 'shop',
            show: false },
         {  key: 'contact',
            display: 'contact',
            show: false }
      ];
   }

   /* Init */
   init();
}
