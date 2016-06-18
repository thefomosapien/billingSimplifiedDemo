angular.module("app").service("patientProfileSvc", function ($http) {

    this.getUsersPractice = function (id) {
        return $http({
            method: 'GET',
            url: '/get/practice/' + id
        }).then(function (response) {
            console.log("getUserPractice", response);
            return response;
        });
    };

    this.getPatient = function(id) {
        return $http({
            method: 'GET',
            url: '/get/patient/' + id
        }).then (function (response) {
            console.log(response);
            return response.data;
        })
    }

    this.addPatient = function (patientInfo, practiceId) {
        console.log(patientInfo, practiceId);
        patientInfo.practiceId = practiceId
        return $http({
            method: 'POST',
            url: '/create/patient',
            data: patientInfo
        }).then(function (response) {
           console.log(response);
            return response;
        });
    };

    this.deletePatient = function (id) {
        return $http({
            method: "DELETE",
            url: "/delete/patient/" + id
        })
            .then(function (response) {
                console.log(response);
                return response;
            })
    }

    this.submitBill = function (data, patientId) {
        data.patientId = patientId;
        console.log("data", data);
        return $http({
            method: 'POST',
            url: '/create/bill',
            data: data
        }).then(function (response) {
            return response;
        });
    };

    this.addToBillArray = function (patientInfo) {
        console.log("patient id", patientInfo.data.patientId);
        return $http({
            method: 'PUT',
            url: '/update/patient/' + patientInfo.data.patientId,
            data: patientInfo.data
        }).then(function (response) {
            console.log("so many console logs", response);
            return response;
        });
    };

    this.addToPatientArray = function (addPatient) {
        console.log("doesn't hurt", addPatient);
        return $http({
            method: "PUT",
            url: '/updateClinic/patientArray/' + addPatient,
            data: addPatient
        }).then(function (response) {
            return response.data;
        })
    }

    this.makePayment = function (paymentInfo, id) {
        return $http({
            method: "PUT",
            url: '/update/bill/' + id,
            data: paymentInfo
        })
            .then(function (response) {

                return response;
            })
    }
});
