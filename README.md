angular-refresh
===============

A directive that allows you to load JSON data from any given URL periodically and update your scope

Sample Plunker
--------------
You can find a sample Plunker at:
http://plnkr.co/edit/oqBN8t

Usage
-----
Include the script angular-refresh.js in your html page.

Make sure your angular module declares this module as a dependency:
```
angular.module('myApp',['datarefresh'])
	.controller('BodyController', [function () {
}]);
```

Include the tag in your HTML:
```
<!-- 
    Remember we can't use a self closing tag like <foo/>. We must use <foo></foo>
	
	You can either use 'get' or 'jsonp' as values for the method attribute.
	
	If you use any other value, it will default to 'get'
	
	The following example loads JSON data via JSONP from flickr and assigns it to the model flickr.
	
	If you are using 'jsonp' as your method, your url should include the string JSON_CALLBACK (as shown)
	as the callback for your service.
	
	The interval is the refresh interval in milli-seconds.
	
	The Url should include all the data you want to send to your service
-->
    <angular-refresh url="http://api.flickr.com/services/feeds/photos_public.gne?tagmode=all&format=json&jsoncallback=JSON_CALLBACK"
      ng-model="flickr" interval="5000" method="jsonp"></angular-refresh>
	  
	<div ng-repeat="item in flickr.items">
       {{ item.title }}
    </div>
```