var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChartSchema = new mongoose.Schema({

		practiceId: {type: Schema.Types.ObjectId, ref:"Practice"},
		date: {type: Date, default: Date.now},
		// totalAR
		ARcurrent: Number,
		ARthirtySixty: Number,
		ARsixtyNinety: Number,
		ARninetyUp: Number,
		// insuranceAR
		insuranceARcurrent: Number,
		insuranceARthirtySixty: Number,
		insuranceARsixtyNinety: Number,
		insuranceARninetyUp: Number,
		// patientAR
		patientARCurrent: Number,
		patientARThirtySixty: Number,
		patientARSixtyNinety: Number,
		patientARNinetyUp: Number,
		// patients
		patientTotalPatients: Number,
		patientNewPatients: Number,
		// billed
		totalBilled: Number,
		billedPerPatient: Number

});
module.exports = mongoose.model('Chart', ChartSchema);
