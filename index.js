// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

// CONFIG //
var config = require('./config');

// CONTROLLERS //
var UserCtrl = require('./Server/Controllers/localAuth/UserCtrl.js');
var practiceCtrl = require('./Server/Controllers/practiceCtrl.js');
var patientCtrl = require('./Server/Controllers/patientCtrl.js');
var billCtrl = require('./Server/Controllers/billCtrl.js');
var chartCtrl = require('./Server/Controllers/chartCtrl.js');

// SERVICES //
var passport = require('./Server/Controllers/localAuth/passport');

//SCHEMAS
var User = require('./Server/Models/User');

// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

// EXPRESS //
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));

// PRACTICE CONTROLLERS
app.post('/create/practice', practiceCtrl.createPractice);
app.get('/get/practice', practiceCtrl.getPractice);
app.get('/get/practice/:id', practiceCtrl.getPracticeById);
app.put('/update/practice/:id', practiceCtrl.updatePractice);
app.delete('/delete/practice/:id', practiceCtrl.deletePractice);
app.put('/updateClinic/patientArray/:id', practiceCtrl.addToPatientArray);

//USER CONTROLLERS
app.get('/get/users', UserCtrl.getAllUsers);
app.get('/get/user/:id', UserCtrl.getUserById);
app.delete('/delete/user/:id', UserCtrl.deleteUser);
app.put('/update/user/:id', UserCtrl.updateUser);

//PATIENT CONTROLLERS
app.post('/create/patient', patientCtrl.createPatient);
app.get('/get/patients', patientCtrl.getPatients);
app.get('/get/patientsx', patientCtrl.getPatientsx);
app.get('/get/patient/:id', patientCtrl.getPatientById);
app.delete('/delete/patient/:id', patientCtrl.deletePatient);
app.put('/update/patient/:id', patientCtrl.updatePatient);
app.put('/update/patientInfo/:id', patientCtrl.updatePatientFoReal);
app.put('/update/patientPracticeId/:id', patientCtrl.addPracticeId);

//BILL CONTROLLERS
app.post('/create/bill', billCtrl.createBill);
app.get('/get/bills', billCtrl.getBills);
app.get('/get/bill/:id', billCtrl.getBillById);
app.delete('/delete/bill/:id', billCtrl.deleteBill);
app.put('/update/bill/:id', billCtrl.updateBill);

//PRACTICE DATA FOR CHARTS CONTROLLERS
app.post('/create/chartData', chartCtrl.createChartData);
app.get('/get/dailyChartData', chartCtrl.getDailyChartData);
app.get('/get/weeklyChartData', chartCtrl.getWeeklyChartData);
app.get('/get/monthlyChartData', chartCtrl.getMonthlyChartData);
app.get('/get/chartData/:id', chartCtrl.getChartDataById);
app.delete('/delete/chartData/:id', chartCtrl.deleteChartData);
app.put('/update/chartData/:id', chartCtrl.updateChartData);

// app.post('/create/user', userCtrl, register);

// LOCAL AUTH
app.use(passport.initialize());
app.use(passport.session());
app.post('/create/user', UserCtrl.register);
app.get('/me', isAuthed, UserCtrl.me);
app.get('/current/user', UserCtrl.getCurrentUser);
app.put('/users/:_id', isAuthed, UserCtrl.update);

//double auth
var userIsPracticeAdmin = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  if (req.user.userType === 'practiceAdmin' && req.body.practiceId === req.user.practiceId) return next();
  return res.status(401).send();
};

var userIsPracticeStaff = function(req, res, next) {
   if (!req.isAuthenticated()) return res.status(401).send();
   if (req.user.userType === 'practiceStaff' && req.body.practiceId === req.user.practiceId) return next();
   return res.status(401).send();
 };

var userIsBillingStaff = function(req, res, next) {
   if (!req.isAuthenticated()) return res.status(401).send();
   if (req.user.userType === 'billingStaff' && req.body.practiceId === req.user.practiceId) return next();
   return res.status(401).send();
 };

var userIsBillingAdmin = function(req, res, next) {
   if (!req.isAuthenticated()) return res.status(401).send();
   if (req.user.userType === 'billingAdmin' && req.body.practiceId === req.user.practiceId) return next();
   return res.status(401).send();
 };

app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));

app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});

// app.get('/practice', userIsPracticeStaff, UserCtrl.getpractices);
// app.get('/secrets', userIsPracticeAdmin, billCtrl.secrets);
// app.get('/secrets', userIsBillingStaff, billCtrl.secrets);
// app.get('/login', userIsPracticeStaff, );
// app.get('/login', userIsBillingStaff, );
// app.get('/login', userIsBillingAdmin, );

// CONNECTIONS //
var mongoURI = config.MONGO_URI;
var port = config.PORT;
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});
