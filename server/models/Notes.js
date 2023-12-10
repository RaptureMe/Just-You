const { Schema } = require('mongoose');

const notesSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
  });

  const Notes = model('Notes', notesSchema);
    module.exports = Notes;