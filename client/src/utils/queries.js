import { gql } from "@apollo/client"

export const QUERY_ME = gql`
  query Me {
      me {
        username
        savedVideos {
          channels
          description
          videoId
          thumbnailURL
          link
          title
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