//example http://jsbin.com/jukogewobo/5/
//more explaination http://bresleveloper.blogspot.co.il/
angular.module('bresleveloper', []).directive('bNgSlide', function () {
    return {
        link: function (scope, element, attrs) {
            //initially hiding element since many times the css doens't cover it and the element can be seen
            element.hide();
            //parsing base parameters
            var innerFunction = scope[attrs.bNgSlide];
            var time = parseInt(attrs.bTime || 300);
            var delay = parseInt(attrs.bDelay || time);

            //overriding original scope function
            scope[attrs.bNgSlide] = function () {
                //caching original user arguments to pass them on to the "his" function
                var outerArgs = arguments;
                //1st thing slideUp before executing anything
                element.slideUp(time);
                //clear any previous attempts, with is actually the implementation for "hover intent" 
                clearTimeout(scope.bresleveloperNgShowTimeout);

                //testing for a case where the user dont want to activate the slide
                if (attrs.bTest) {
                    var ret = true;
                    for (var i = 0; i < outerArgs.length; i++) {
                        if (outerArgs[i][attrs.bTest]) {
                            ret = false;
                            break;
                        }
                    }

                    if (ret) {
                        return;
                    }
                }

                //timeout to implement  "hover intent" 
                scope.bresleveloperNgShowTimeout = setTimeout(function () {
                    //calling the user original function
                    innerFunction.apply(null, outerArgs);
                    //applying changes to scope
                    scope.$apply();
                    if (element.queue('fx').length > 1) {
                        element.queue('fx', element.queue('fx').slice(0, 1));
                    }//this is what stop(true, true) should really have done, for some reason it broke the real height of the element
                    element.slideDown(time);
                }, delay);
            };// end scope[attrs.bNgSlide]
        }
    };
});