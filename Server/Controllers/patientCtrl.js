// var Staff = require('./../Models/User');
// var Practice = require('./../Models/Practice');
var Patient = require('./../Models/Patient');
var User = require('./../Models/User');
var Practice = require("./../Models/Practice");

module.exports = {
  createPatient: function(req, res, next){
    console.log("create patient req.body", req.body);
    var newPatient = new Patient(req.body);

    newPatient.save(function(err, result){
      if(err){
        res.status(500 + 'createPatient function error').json(err);
      }
      else {
          console.log("new Patient result", result);
        //   Practice.findByIdAndUpdate(result.practiceId, {$push:{"patients": result}})
        res.status(200).json(result);
      }
    });
  },
  // createPatient: function(req, res, next){
  //   var newPatient = new Patient(req.body);
  //
  //   newPatient.save(function(err, result){
  //     if(err){
  //       res.status(500 + 'createPatient function error').json(err);
  //     }
  //     else{
  //       User.findByIdAndUpdate(req., {
  //       $push: {
  //         'photos': response._id
  //       }
  //     }, function (err, user) {
  //       console.log(user);
  //       if (err) {
  //         res.status(500).send(err)
  //       } else {
  //         res.status(200).send(user)
  //       }
  //     })
  //   }
  //   });
  // },

  getPatients: function(req, res, next) {
    Patient.find(req.query)
    .populate("practiceId")
    .populate("bills")
    .exec(function(err, result){
      if (err) {
          res.status(500 + "getPatient function error").json(err);
      } else {
          res.status(200).json(result);
      }
    })
  },
  getPatientsx: function(req, res) {
     console.log("THIS IS OUR CONSOLE LOG!!! REQ " + req)
     console.log("THIS IS OUR CONSOLE LOG!!! RES " + res)
     console.log("THIS IS OUR CONSOLE LOG!!! REQ.Body " + req.body)
   //  var query = {};
   //  if (req.query.status) query["birds.status"] = req.query.status;
   //  if (req.query.user) query["user"] = req.query.user;
   req.query.firstName = new RegExp(req.query.firstName);
   req.query.lastName = new RegExp(req.query.lastName);
   // req.query.practiceId = req.user.practiceId;

    Patient.find(req.query).populate("user bills").exec(function(err, users) {
      console.log(req);
      return res.send(users);
    });
},
  addPracticeId: function(req, res, next){
    Patient.create(req.body, function(err, response){
      if(err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json(response);
      }
         })
    // Patient.findByIdAndUpdate({"_id":req.params._id}).populate("practiceId").exec(function(err, response){
    //   if (err) {
    //       res.status(500).json(err);
    //   } else {
    //       res.status(200).json(response);
    //   }
    // });
  },
  getPatientById: function(req, res, next){
    Patient.findById(req.params.id)
    .populate('practiceId')
    .populate('bills')
    .exec(function(err, result){
      if(err) {
        res.status(500 + "getPatientById function error").json(err);
      }
      else{
        res.status(200).json(result);
      }
    })
  },
  deletePatient: function(req, res, next){
    Patient.findByIdAndRemove(req.params.id).exec(function(err, result){
      console.log(req.params.id);
      if(err){
        console.log(err);
        res.status(500 + 'deletePatient function error').json(err);
      }
      else{
        res.status(200).json(result);
      }
    })
  },

  updatePatient: function(req, res, next){
      console.log("req.params and req.body", req.params, req.body);
    Patient.findByIdAndUpdate(req.params.id, {$push:{"bills": req.body}}).exec(function(err, result){
      console.log(req.body);
      console.log(req.params);
      console.log("resulte", result);
      if(err){
        res.status(500 + 'updatePatient function error');
      }
      else{
         console.log("success", result);
        res.status(200).json(result);
      }
    })
  },

    updatePatientFoReal: function(req, res, next){
      // console.log("req.params and req.body", req.params, req.body);
    Patient.findByIdAndUpdate(req.params.id, req.body, function(err, result){
      console.log(req.body);
      console.log(req.params);
      console.log("result", result);
      if(err){
        res.status(500 + 'updatePatient function error');
      }
      else{
         console.log("success", result);
        res.status(200).json(result);
      }
    })
  }
};
