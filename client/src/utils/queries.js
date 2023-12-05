import { gql } from "@apollo/client"
export const QUERY_ME = gql`
query Me {
    me {
      username
      savedVideos {
        channel
        description
        videoId
        image
        link
        title
      }
    }
  }
`