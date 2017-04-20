var mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports = {
  index: function(req, res) {
    Category.find({}, function(err, categories) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(categories);
      }
    })
  },
  show: function(req, res) {
    Category.findOne({_id:req.params.id}, function(err, category) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(category);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    Category.find({name:req.body.name}, function(err, data) {
      if(err) {
        console.log(err);
        res.json({errors:["Error communicating to database"]});
      }
      else {
        if(!data.length) {
          console.log("No matches found");
          var category = new Category({name:req.body.name});
          category.save(function(err) {
            if(err) {
              console.log("Error saving new category");
              res.json({errors:"Error saving new category"})
            }
            else {
              console.log("No errors")
              res.json(category);
            }
          })
        }
        else {
          res.json({errors:[data.length + " category(s) already exist with that name"]})
        }
      }
    })

  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Category.findOne({_id:req.params.id}, function(err, category) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        category.name = req.body.name;
        category.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(category);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Category.deleteOne({_id:req.params.id}, function(err, category) {
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
