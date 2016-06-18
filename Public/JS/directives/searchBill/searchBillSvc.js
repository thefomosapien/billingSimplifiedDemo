angular.module("app").service("searchBillSvc", function($http) {


this.getAllBills = function() {
  return $http({
     method: 'GET',
     url: '/get/bills'
     }).then(function(res) {
      //   console.log(res)
        return res.data;
        })
        };

});
