angular.module("app").service("billService", function ($http) {

    this.getBill = function (id) {
        return $http({
            method: 'GET',
            url: '/get/bill/' + id
        }).then(function (response) {
            console.log("getBill", response);
            return response;
        });
    };

});