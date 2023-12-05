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

  type Video {
    channel: [String]
    description: String!
    videoId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    channelData(query: String!): ChannelData
  }

  input VideoInput {
    channel: [String]
    description: String!
    videoId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveVideo(video: VideoInput): User
    removeVideo(videoId: String!): User
  }
`;

module.exports = typeDefs;
