var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

module.exports = {
  index: function(req, res) {
    Topic.find({}).populate('category').populate('creator').exec(function(err, topics) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(topics);
      }
    })
  },
  show: function(req, res) {
    Topic.findOne({_id:req.params.id}).populate('creator').populate('category').populate('posts').then(function(topic) {
      Topic.populate(topic, {path: 'posts._user', model: 'User'}, function(err, topic) {
        Topic.populate(topic, {path: 'posts.comments', model: 'Comment'}, function(err, topic) {
          Topic.populate(topic, {path: 'posts.comments._user', model: 'User'}, function(err, topic) {
            res.json(topic);
          })
        })
      })
    }, function() {
      res.json({errors: ["Not found!"]});
    })
  },
  create: function(req, res) {
    var errors = [];
    Topic.find({name:req.body.name}, function(err, data) {
      if(err) {
        console.log(err);
        res.json({errors:["Error communicating to database"]});
      }
      else {
        if(!data.length) {
          console.log("No matches found");
          console.log("req body in topic controller:",req.body);
          var topic = new Topic(
            {name:req.body.name,
            description: req.body.description,
            category: req.body.category,
            creator: req.body.creator});
          topic.save(function(err) {
            if(err) {
              console.log("Error saving new topic", err);
              res.json({errors:"Error saving new topic"})
            }
            else {
              console.log("No errors")
              res.json(topic);
            }
          })
        }
        else {
          res.json({errors:[data.length + " topic(s) already exist with that name"]})
        }
      }
    })
  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Topic.findOne({_id:req.params.id}, function(err, topic) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        topic.name = req.body.name;
        topic.description = req.body.description;
        topic.posts = req.body.posts;
        topic.creator = req.body.creator;
        topic.category = req.body.category;
        topic.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(topic);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Topic.deleteOne({_id:req.params.id}, function(err, topic) {
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
