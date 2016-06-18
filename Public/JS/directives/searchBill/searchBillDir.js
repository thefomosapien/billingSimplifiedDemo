angular.module( "app" ).directive( "searchBillDir", function () {

     return {
       // scope: {
       //    templHtmlName: '=passToDirName'
       // },
       templateUrl: './JS/directives/searchBill/searchBill.html',
       restrict: 'E',   //link: function(scope, element, attr) {}, scope: {}   **also optoins,
      //  link: function(scope, element, attribute) {},
       controller: 'searchBillCtrl'
     };

  });
