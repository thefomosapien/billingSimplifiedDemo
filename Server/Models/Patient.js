var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    insurance: {
        plan_name: { type: String },
        plan_phone: { type: String },
        member_id: { type: String }
    },
    phoneNumber: { type: String },
    email: { type: String },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: Number }
    },
    dateOfBirth: { type: Date },
    lastFourSocial: { type: String },
    patientNotes: { type: String },
    practiceId: { type: Schema.Types.ObjectId, ref: "Practice" },
    bills: [{ type: Schema.Types.ObjectId, ref: 'Bill' }]
})
module.exports = mongoose.model('Patient', PatientSchema);
