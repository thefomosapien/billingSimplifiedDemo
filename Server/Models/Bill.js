var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Patient = require('./Patient');

var BillSchema = new mongoose.Schema({
  billAmount:{type: Number},
  totalPaid: {type: Number},
  firstDateCreated:{type: Date},
  dateDue:{type: Date},
  patientId:{ type: Schema.Types.ObjectId, ref: "Patient"},
  billingAddress: {type:String},
  notes: {type:String},
  payments: [{
       paymentAmount: {type: Number, required: true},
       remainingBal: {type: Number},
       purpose: {type: String, required: true},
       paidBy: {type: String, required: true},
       method: {type: String, required: true},
       comments: {type: String},
       dateCreated:{type: Date, required: true}
   }]
})
module.exports = mongoose.model('Bill', BillSchema);
