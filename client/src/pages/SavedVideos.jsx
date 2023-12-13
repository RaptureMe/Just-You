import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Modal
} from 'react-bootstrap';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {REMOVE_VIDEO, CREATE_NOTE} from "../utils/mutations";
import {QUERY_ME} from "../utils/queries";
import Auth from '../utils/auth';
import { removeVideoId } from '../utils/localStorage';




const SavedVideos = () => {
    // CHECK THIS SECTION 
    const [showModal, setShowModal] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);

  const [RemoveVideo] = useMutation (REMOVE_VIDEO, {
    refetchQueries: [
      QUERY_ME,
      'Me'
    ]
  });
  const [CreateNote] = useMutation(CREATE_NOTE, {
    refetchQueries: [
      QUERY_ME,
      'Me'
    ]
  });

  // const [showNote] = useMutation(GET_NOTE, {
  //   refetchQueries: [
  //     QUERY_ME,
  //     'Me'
  //   ]
  // });

  const {loading, data} = useQuery (QUERY_ME);
  console.log(data);
  const savedVideos = data?.me.savedVideos || []


  // create function that accepts the video's mongo _id value as param and deletes the video from the database

  // accepting the video's mongo _id value as param and deletes the video from the database
  const handleDeleteVideo = async (videoId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await RemoveVideo({variables: {videoId}});
      // upon success, remove video's id from localStorage
      removeVideoId(videoId);
    } catch (err) {
      console.error(err);
    }
  };

     //  opening and closing the modal
     const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };


  // CHECK THIS TO SEE IF CORRECT
  const handleAddNote = async (videoId, content) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log(content)
      const NoteInput = {"videoId": videoId, "content": content}
      console.log('add note')
      console.log(NoteInput)
      await CreateNote({ variables:{videoId, content} });
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewNote = (video) => {
    
    setSelectedVideo(video);
    setNoteContent(video.note || '');
    setShowModal(true);
  };


  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
  <>
<div className="text-light bg-dark p-5 savedNav">
        <Container>
          <h1>Saved Videos</h1>
        </Container>
      </div>
      <Container>
        <h3 className='pt-5'>
          {savedVideos.length
            ? `Viewing ${savedVideos.length} saved ${savedVideos.length === 1 ? 'video' : 'videos'}:`
            : 'You have no saved videos!'}
        </h3>
        {savedVideos.map((video) => (
          <Row key={video.videoId} className="my-3">
            <Col xs="12" md="6">
              {video.thumbnailURL && (
                <img src={video.thumbnailURL} alt="video thumbnail" className="img-fluid" />
              )}
            </Col>
            <Col xs="12" md="6">
              <h5>{video.title}</h5>
              
              
              <Button className='deleteButton btn-block btn-danger' onClick={() => handleDeleteVideo(video.videoId)}>
                Delete!
              </Button>
              <Button
                className='viewButton btn-block btn-info'
                onClick={() => handleViewNote(video)}
              >
                View Note
              </Button>
              <Button
                className='addButton btn-block btn-primary'
                onClick={() => {
                  setSelectedVideo(video);
                  handleShowModal();
                  setNoteContent(video.note || ''); // Set the initial content of the note
                }}
              >
                Add Note
              </Button>
            </Col>
          </Row>
        ))}

        {/* Modal for adding/editing notes */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
          <Modal.Title>{selectedVideo?.title || 'Add/Edit Note'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => {
              e.preventDefault();
              handleAddNote(savedVideos[0].videoId, noteContent);
              handleCloseModal(); // Close the modal after adding/editing the note
            }}>
              <Form.Group controlId={`formNoteContent_${savedVideos[0].videoId}`}>
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter notes here"
                  name="content"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Note
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default SavedVideos;
