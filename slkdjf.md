addToPatientArray: function(req, res, next){
  console.log( req.params.id);
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.params));
  console.log(req.body._id);
console.log(req.body.practiceId);
// console.log(req.params.Practice);
  // console.log(addPatient);
  // console.log(response);
  // console.log(req.user);
  Practice.findByIdAndUpdate(req.body.practiceId, {$push:{"patients": req.body}}, function(err, response){
    if(err){
      console.log("YOU SUCK MOST");
      res.status(500).json(err);

    }
    else{
      console.log("response........" + response);
      res.status(200).json(response);
    }
  })
},

Questions for Ryan.
- You mentioned you were going to be inputting data from the billing Admin page for the graphs.  Were you wanting this data to be saved and persist?

User has a 1 to 1 ref to Practice id

Practice has a 1 to many ref to Patients.  Staff as well?

Patient has a ref to Bills
Patient has a ref to Clinic

Bill has a ref to Patient
