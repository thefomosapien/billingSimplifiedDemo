angular.module( "app" ).directive( "csvImportDir", function () {

     return {
       // scope: {
       //    templHtmlName: '=passToDirName'
       // },
       templateUrl: './JS/directives/csvImport/csvImport.html',
       restrict: 'E',   //link: function(scope, element, attr) {}, scope: {}   **also optoins,
      //  link: function(scope, element, attribute) {},
       controller: 'csvImportCtrl'
     };

  });
