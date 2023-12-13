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
      id
      content
      
    }
  }
}
`;

export const CHANNELDATA = gql`
  query channelData($channelName: String!) {
    channelData(channelName: $channelName) {
      viewCount
      subscriberCount
      videoCount
    }
  }
`;


export const RENDER_VIDEO = gql`
    query renderVideo($videoID: String!) {
      renderVideo(videoID: $videoID) {
        link
        videoTitle
        description
        channelTitle
        thumbnailURL
      }
    }
`;

export const GET_NOTE = gql`
  query getNote {
    getNote {
      _id
      content
    }
  }
`;