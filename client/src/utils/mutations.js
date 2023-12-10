import { gql } from "@apollo/client"
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`
export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
export const SAVE_VIDEO = gql`
mutation SaveVideo($video: VideoInput) {
  saveVideo(video: $video) {
    username
    savedVideos {
      channels
      videoId
      title
      description
      link
      thumbnailURL
      channelTitle
    }
  }
}
`
export const REMOVE_VIDEO = gql`
mutation RemoveVideo($videoId: String!) {
  removeVideo(videoId: $videoId) {
    savedVideos {
      title
    }
  }
}
  `
  export const CREATE_NOTE = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      content
      user {
        _id
        username
      }
      video {
        videoId
        title
      }
    }
  }
`