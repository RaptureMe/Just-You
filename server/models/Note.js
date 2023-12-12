const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  videoId: {
    type: String,
    required: true
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    // required: true,
  },
});

const Note = model('Note', noteSchema);
module.exports = Note;