var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
}, {timestamps: true});

var Topic = mongoose.model('Topic', TopicSchema);
