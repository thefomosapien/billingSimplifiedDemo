var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var Practice = ('./Practice.js');

var UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, index: true, trim: true },
  password: { type: String },
  userType: {type: String, required: true, enum:["practiceStaff", "practiceAdmin", "billingStaff", "billingAdmin"]},
  practiceId: {type: Schema.Types.ObjectId, ref: "Practice"}
  // patients:[{type: Schema.Types.ObjectId, ref:'Patient'}]
});

UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

UserSchema.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', UserSchema);
