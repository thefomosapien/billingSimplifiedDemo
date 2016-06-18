var User = require('./../../Models/User');
module.exports = {
  register: function(req, res, next) {
      console.log("hitting new user");
    User.create(req.body, function(err, result) {
      if(err) return res.status(500).send(err);
      newUser = result.toObject();
      newUser.password = null;
      res.status(200).json(newUser);
    });
  },
  //redirect
  me: function(req, res, next) {
    if (!req.user) return res.status(401).send('current user not defined');
    req.user.password = null;
    console.log("userCtrl.me", req.user);
    return res.status(200).json(req.user);
},
//resolve
getCurrentUser: function(req, res, next) {
    User.findOne({"_id":req.user._id}).exec(function(err, response) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log("this worx?");
            res.status(200).json(req.user)
        }
    });
},
  update: function(req, res, next) {
    User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
      if (err) next(err);
      res.status(200).send('user updated');
    });
  },


    getAllUsers: function(req, res, next){
      User.find(req.query)
      .populate('practiceId')
      .exec(function(err, result){
        if (err) {
            res.status(500 + "getUser function error").json(err);
        } else {
            res.status(200).json(result);
        }
      })
    },
    getUserById: function(req, res, next){
      User.findById(req.params.id)
      .populate('practiceId')
      .exec(function(err, result){
        if(err) {
          res.status(500 + "getUserById function error").json(err);
        }
        else{
          res.status(200).json(result);
        }
      })
    },
    deleteUser: function(req, res, next){
      User.findByIdAndRemove(req.params.id)
      .exec(function(err, result){
        console.log(req.params.id);
        if(err){
          console.log(err);
          res.status(500 + 'deleteUser function error').json(err);
        }
        else{
          res.status(200).json(result);
        }
      })
    },
    updateUser: function(req, res, next){
      User.findByIdAndUpdate(req.params.id, req.body).exec(function(err, result){
        console.log(req.body);
        console.log(req.params);
        if(err){
          res.status(500 + 'updateUser function error');
        }
        else{
          res.status(200).json(result);
        }
      })
    }
  };
