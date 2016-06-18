angular.module( "app" ).directive( "searchPatientDir", function () {

     return {
       // scope: {
       //    templHtmlName: '=passToDirName'
       // },
       templateUrl: './JS/directives/searchPatient/searchPatient.html',
       restrict: 'E',   //link: function(scope, element, attr) {}, scope: {}   **also optoins,
      //  link: function(scope, element, attribute) {},
       controller: 'searchPatientCtrl'
     };

  });
