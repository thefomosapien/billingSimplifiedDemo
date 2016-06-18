// var Staff = require('./../Models/User');
// var Practice = require('./../Models/Practice');
var Bill = require('./../Models/Bill');

module.exports = {
  createBill: function(req, res, next){
      console.log("hitting new bill", req.body);
    var newBill = new Bill(req.body);

    newBill.save(function(err, result){
      if(err){
        res.status(500 + 'createBill function error').json(err);
      }
      else{
        res.status(200).json(result);
      }
    });
  },
  getBills: function(req, res, next){
    Bill.find(req.query)
    .populate("patientId")

    .exec(function(err, result){
      if (err) {
          res.status(500 + "getBill function error").json(err);
      } else {
          res.status(200).json(result);
      }
    })
  },
  getBillById: function(req, res, next){
    Bill.findById(req.params.id).exec(function(err, result){
      if(err) {
        res.status(500 + "getBillById function error").json(err);
      }
      else{
        res.status(200).json(result);
      }
    })
  },
  deleteBill: function(req, res, next){
    Bill.findByIdAndRemove(req.params.id).exec(function(err, result){
      console.log(req.params.id);
      if(err){
        console.log(err);
        res.status(500 + 'deleteBill function error').json(err);
      }
      else{
        res.status(200).json(result);
      }
    })
  },
  updateBill: function(req, res, next){
      console.log(req.body);
      console.log(req.params);
      console.log(req.body.data);
    Bill.findByIdAndUpdate(req.params.id, {$push:{'payments':req.body}}).exec(function(err, result) {
      if(err){
        res.status(500 + 'updateBill function error');
      }
      else{
        res.status(200).json(result);
      }
    })
  }
};
