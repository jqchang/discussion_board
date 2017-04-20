var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

module.exports = {
  index: function(req, res) {
    Comment.find({}, function(err, comments) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(comments);
      }
    })
  },
  show: function(req, res) {
    Comment.findOne({_id:req.params.id}, function(err, comment) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(comment);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    console.log("req body:",req.body);
    var comment = new Comment({contents:req.body.contents, _user:req.body._user});
    comment.save(function(err) {
      if(err) {
        console.log("Error saving new comment");
        res.json({errors:"Error saving new comment"})
      }
      else {
        console.log("No errors")
        res.json(comment);
      }
    })
  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Comment.findOne({_id:req.params.id}, function(err, comment) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        comment.contents = req.body.contents;
        comment._user = req.body._user;
        comment.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(comment);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Comment.deleteOne({_id:req.params.id}, function(err, comment) {
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
