/**
 * Cordova StartApp plugin
 * Author: Dmitry Medvinsky <dmedvinsky@gmail.com>
 * License: MIT/X11
 */

var StartApp = { 
    start: function (success, fail, params) {
        success = success ? success : function() {};
        fail = fail ? fail : function() {};
        var component = params.android;
        var componentNames = component.split(",");
        var packageName = componentNames[0];
	var activityName = componentNames[1];
	console.log( 'Package Name: ' + packageName );
      return cordova.exec( success, fail, 
                           "StartApp", 
                           "startApp", [packageName,activityName]); 
    } 
};
