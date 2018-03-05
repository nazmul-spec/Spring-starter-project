
'use strict';

define(['app','services/utils/navigationService'], function (app) {

	var navigationService = function ($location, $anchorScroll) {
		
		this.goToTop = function(){
			$location.hash("");
			$anchorScroll();
		};

		this.topMenuNavigation = function (navUrl) {
			
			this.goToTop();
			$location.path('/'+navUrl); 
		};

		this.menuNavigation = function (navUrl) {

			this.goToTop();
			$location.path('/'+navUrl); 
		};

		this.showPageWithData = function (url, id) {
			
			this.goToTop();
			$location.path('/'+url+'/'+id);
		};

	};

	app.service('navigationService', ['$location', '$anchorScroll', navigationService]);

});
