angular.module("app").service("searchPatientSvc", function($http) {


this.getAllPatients = function() {
  return $http({
     method: 'GET',
     url: '/get/patients'
     }).then(function(res) {
        return res.data;
        })
        };

});
