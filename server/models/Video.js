const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedVideos` array in User.js
const videoSchema = new Schema({
  channels: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved video id from YouTube
  videoId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String
  },
  channelTitle: {
    type: String
  },
  viewCount: {
    type: String
  }
});

module.exports = videoSchema;
