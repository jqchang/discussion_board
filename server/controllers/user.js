var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res) {
    User.find({}, function(err, users) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(users);
      }
    })
  },
  show: function(req, res) {
    User.findOne({_id:req.params.id}, function(err, user) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(user);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    User.find({name:req.body.name}, function(err, data) {
      if(err) {
        console.log(err);
        res.json({errors:["Error communicating to database"]});
      }
      else {
        if(!data.length) {
          var user = new User({name:req.body.name});
          user.save(function(err) {
            if(err) {
              res.json({errors:"Error saving new user", login:false})
            }
            else {
              console.log("No errors")
              res.json({user:user, login:true});
            }
          })
        }
        else {
          // if user already exists, return that user instead
          res.json({user:data[0], login:true});
        }
      }
    })

  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    User.findOne({_id:req.params.id}, function(err, user) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        console.log(req.body);
        user.name = req.body.name;
        user.comments = req.body.comments;
        user.topics = req.body.topics;
        user.posts = req.body.posts;
        user.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(user);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    User.deleteOne({_id:req.params.id}, function(err, user) {
      if(err) {
        console.log("error in DELETE:id")
        res.json({success:"false", errors:err});
      }
      else {
        res.json({success:"true"})
      }
    });
  }
}
