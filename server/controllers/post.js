var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
  index: function(req, res) {
    Post.find({}).populate('comments').exec(function(err, posts) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(posts);
      }
    })
  },
  show: function(req, res) {
    Post.findOne({_id:req.params.id}).populate('comments').exec(function(err, post) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(post);
      }
    })
  },
  create: function(req, res) {
    var errors = [];

    var post = new Post({contents:req.body.contents, _user:req.body._user});
    post.save(function(err) {
      if(err) {
        console.log("Error saving new post");
        res.json({errors:"Error saving new post"})
      }
      else {
        console.log("No errors")
        res.json(post);
      }
    })
  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Post.findOne({_id:req.params.id}, function(err, post) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        post.contents = req.body.contents;
        post.comments = req.body.comments;
        post.upvote = req.body.upvote;
        post.downvote = req.body.downvote;
        post.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(post);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Post.deleteOne({_id:req.params.id}, function(err, post) {
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
