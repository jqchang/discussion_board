var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  topics: [{type: mongoose.Schema.Types.ObjectId, ref: "Topic"}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
