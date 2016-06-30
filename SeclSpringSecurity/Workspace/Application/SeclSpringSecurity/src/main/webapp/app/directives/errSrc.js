'use strict';

define(['app'], function (app) {

    var errSrc = function () {    	
        return {
        	link: function(scope, element, attrs) {
      	      element.bind('error', function() {
      	        if (attrs.src != attrs.errSrc) {
      	          attrs.$set('src', attrs.errSrc);
      	        }
      	      });
      	    }
        }
    };
    app.directive('errSrc', [ errSrc]);
});