angular.module('datarefresh', [])
.directive('angularRefresh', ['$parse', '$timeout', '$http', function ($parse, $timeout, $http) {
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function (scope, element, attrs) {
          console.log(element);
            var isRunning = true;
            var method = 'get';
            var url = '';
            
            function successFunction(data) {
              if (data !== undefined && isRunning) {
                try {
                  $parse(attrs.ngModel).assign(scope, data);
                }
                catch (error) {
                  //Just in case scope got detroyed while we were trying to update
                  console.log(error);
                }
              }

              if (isRunning) {
                $timeout(function () { refreshFromUrl(url, interval); }, interval);
              }
            }

            function refreshFromUrl(url, interval) {
              if (isNaN(interval)) {
                interval = 2000;
              }
              $http[method](url).success(function (data, status, headers, config) {
                successFunction(data);
              })
              .error(function (data, status, headers, config) {
                console.log(data);
              });
            }

            if (attrs.ngModel !== undefined && attrs.ngModel !== '' && attrs.url !== undefined && attrs.url !== '') 
            {
                var interval = parseInt(attrs.interval);
                if(isNaN(interval))
                    interval = 2000;
                    
                if(attrs.method !== undefined && attrs.method !== '') {
                  if(attrs.method.toLowerCase() == 'get' || attrs.method.toLowerCase()=='jsonp') {
                    method = attrs.method.toLowerCase();
                  }
                }

                url = attrs.url;
                refreshFromUrl(url, interval);
            }

            scope.$on('$destroy', function () {
                isRunning = false;
            });
        }
    }
}]);