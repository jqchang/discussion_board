var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  contents: {type: String, required: true},
  upvote: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
  downvote: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
  _user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}, {timestamps: true});

var Post = mongoose.model('Post', PostSchema);
