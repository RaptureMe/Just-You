import { gql } from "@apollo/client"

export const QUERY_ME = gql`
query Query {
  me {
    _id
    email
    username
    savedVideos {
      videoId
      title
      thumbnailURL
      link
      description
      channels
      channelTitle
    }
    notes {
      videoId
      id
      content
      
    }
  }
}
`;

export const GET_CHANNELDATA = gql`
  query getChannelData($channelName: String!) {
    getChannelData(channelName: $channelName) {
      subscriberCount
      videoCount
      viewCount
      profilePictureURL
    }
  }
`;

export const SEARCH_VIDEO = gql`
  query searchVideo($queriedTitle: String!) {
    searchVideo(queriedTitle: $queriedTitle) {
      link
      videoId
      title
    }
  }
`;

export const RENDER_VIDEO = gql`
    query renderVideo($videoId: String!) {
      renderVideo(videoID: $videoId) {
        link
        title
        description
        channelTitle
        thumbnailURL
      }
    }
`;

export const GET_RECOMMENDED = gql`
    query getRecommendedVideos($videoId: String!) {
      getRecommendedVideos(videoId: $videoId) {
        videoId
        title
        author
        viewcount
        thumbnail
        publishedTime
        videoLength
      }
    }
`;

export const GET_COMMENTS = gql`
  query GetChannelData($videoId: String!) {
    getComments(videoId: $videoId) {
      commentDate
      commentLikes
      commentProfilePicture
      commentText
      commenterName
    }
  }
`
