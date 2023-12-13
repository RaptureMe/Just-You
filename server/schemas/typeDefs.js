const typeDefs = `
  type ChannelData {
    viewCount: Int,
		subscriberCount: Int,
		videoCount: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedVideos: [Video]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Video {
    channels: [String]
    videoId: String
    title: String
    description: String
    link: String
    thumbnailURL: String
    channelTitle: String
  }

  input VideoInput {
    channels: [String]
    videoId: String
    title: String
    description: String
    link: String
    thumbnailURL: String
    channelTitle: String
  }

  type Note {
    id: ID!
    content: String!
    user: User!
    video: Video!
  }
  
  input CreateNoteInput {
    content: String!
    videoId: ID!
  }

  type Query {
    me: User
    getChannelData(channelName: String!): ChannelData
    searchVideo(queriedTitle: String!): [Video]
    renderVideo(videoID: String!): Video
    getNote(content: String!, videoId: String!): Note
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveVideo(video: VideoInput): User
    removeVideo(videoId: String!): User
    createNote(input: CreateNoteInput!): Note 
  }
`;

module.exports = typeDefs;
