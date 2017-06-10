var MainCtrl = function($scope, $location, $compile, $filter) {
   $scope.goHome = function() {
      $scope.curr_menu = null;
      $scope.curr_sub = null;
      $location.path('');
   };

   $scope.setMenu = function(_item) {
      $scope.curr_menu = _item;
      $scope.curr_sub = null;
      $location.path(_item.key);
   };

   $scope.setSub = function(_item, _event) {
      if(_event) _event.stopPropagation();
      $scope.curr_sub = _item;
      $location.path($scope.curr_menu.key + '_' + _item.key);
   };

   $scope.initCarousel = function() {
      var carousel_html = [];
      carousel_html.push('<div id="ease-carousel" class="carousel slide" data-ride="carousel" data-interval="5000">');
      // Indicators
      carousel_html.push(  '<ol class="carousel-indicators">');
      for(var i=0; i<$scope.ui.carousel_imgs.length; ++i)
         carousel_html.push('<li data-target="#ease-carousel" data-slide-to="' + i + '" class="' + (i==0?'active':'') + '"></li>');
      carousel_html.push(  '</ol>');
      // Wrapper for slides
      carousel_html.push(  '<div class="carousel-inner" role="listbox">');
      for(var i=0; i<$scope.ui.carousel_imgs.length; ++i) {
         carousel_html.push('<div class="item' + (i==0?' active':'') + '">');
         carousel_html.push(  '<img src="' + $scope.ui.carousel_imgs[i] + '">');
         carousel_html.push('</div>');
      }
      carousel_html.push(  '</div>');
      // Left and right controls
      carousel_html.push(  '<a class="left carousel-control" href="#ease-carousel" role="button" data-slide="prev">');
      carousel_html.push(     '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
      carousel_html.push(     '<span class="sr-only">Previous</span>');
      carousel_html.push(  '</a>');
      carousel_html.push(  '<a class="right carousel-control" href="#ease-carousel" role="button" data-slide="next">');
      carousel_html.push(     '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>');
      carousel_html.push(     '<span class="sr-only">Next</span>');
      carousel_html.push(  '</a>');
      carousel_html.push('</div>');
      $('.row .home').html( $compile(carousel_html.join(''))($scope) );
   };

   /* Private */
   function init() {
      $scope.ui = {
         home_url: 'page.home.html',
         carousel_imgs: [
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/00_cover_01.png',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/01_MG_7299%20-%20kopie.jpg',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/02_MG_7330.jpg',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/03_09_3314.jpg',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/04_illums%2038678.jpg',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/05_meet-and-eat-blue.jpg',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/06_DonebyDeer-grey_hrs.jpg',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/07_ISI%20Baby_0820.jpg',
            'https://dl.dropboxusercontent.com/u/655552/miniease/carousel/08_ISI%20Baby_0897.jpg'
         ]
      };
      $scope.menu_list = [
         { display: 'about', key: 'about', url: 'page.about.html' },
         { display: 'brands', key: 'brands', url: 'page.brands.html', sub: [
            { display: 'Fabulous Goose', key: 'fabulousgoose', url: 'brand.fabulousgoose.html' },
            { display: 'Done By Deer', key: 'donebydeer', url: 'brand.donebydeer.html' },
            { display: 'ISI mini', key: 'isimini', url: 'brand.isimini.html' },
            { display: 'Nanami', key: 'nanami', url: 'brand.nanami.html' }
         ]},
         { display: 'business partners', key: 'partners', url: 'page.partners.html' },
         { display: 'contact', key: 'contact', url: 'page.contact.html' }
         //{ display: 'events', key: 'events', url: 'page.events.html' }
      ];
      $scope.curr_menu = null;
      $scope.curr_sub = null;
      setCurrMenu();
   }

   function setCurrMenu() {
      var path = $location.path().split('_');
      for(var i=0; i<$scope.menu_list.length; ++i) {
         var item = $scope.menu_list[i];
         if(path[0].indexOf(item.key) != -1) {
            $scope.setMenu(item);
            if(path.length > 1 && $scope.curr_menu.sub) {
               for(var j=0; j<$scope.curr_menu.sub.length; ++j) {
                  var sub = $scope.curr_menu.sub[j];
                  if(path[1].indexOf(sub.key) != -1) {
                     $scope.setSub(sub);
                     break;
                  }
               }
            }
            break;
         }
      }
   }

   /* Init */
   init();
}
