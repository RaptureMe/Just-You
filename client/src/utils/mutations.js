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
mutation CreateNote($videoId: String!, $content: String!) {
  createNote(videoId: $videoId, content: $content) {
    username
  }
}
`

export const GET_NOTE = gql`
mutation Note($videoId: String!) {
  note(videoId: $videoId) {
    user {
      _id
    }
    content
    videoId
  }
}`

export const DELETE_NOTE = gql`
  mutation DeleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId) {
      username
      notes {
        id
        content
        videoId
      }
    }
  }`
  
  export const EDIT_NOTE = gql`
  mutation EditNote($noteId: ID!, $content: String!) {
    editNote(noteId: $noteId, content: $content) {
      username
      notes {
        id
        content
        videoId
      }
    }
  }
`;