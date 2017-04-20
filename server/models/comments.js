var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  contents: {type: String, required: true},
  _user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
}, {timestamps: true});

var Comment = mongoose.model('Comment', CommentSchema);
