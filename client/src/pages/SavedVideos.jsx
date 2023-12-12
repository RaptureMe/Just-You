import {
  Container,
  Card,
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
  const {loading, data} = useQuery (QUERY_ME);
  console.log(data);
  const savedVideos = data?.me.savedVideos || []


<<<<<<< HEAD
  // create function that accepts the video's mongo _id value as param and deletes the video from the database
=======

  // accepting the video's mongo _id value as param and deletes the video from the database
>>>>>>> main
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
      await CreateNote({ variables: { videoId, content } });
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
<div className="text-light bg-dark p-5 savedNav">
        <Container>
          <h1>  Saved Videos</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {savedVideos.length
            ? `Viewing ${savedVideos.length} saved ${savedVideos.length === 1 ? 'video' : 'videos'}:`
            : 'You have no saved videos!'}
        </h2>
        <Row>
          {savedVideos.map((video) => {
            return (
              <Col md="4" key={video.videoId}>
                <Card border='dark'>
                  {video.image ? <Card.Img src={video.image} alt={`The cover for ${video.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{video.title}</Card.Title>
                    <p className='small'>Channels: {video.channels}</p>
                    <Card.Text>{video.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteVideo(video.videoId)}>
                      Delete this Video!
                    </Button>
                    <Button
                      className='btn-block btn-primary'
                      onClick={() => {
                        handleShowModal();
                        setNoteContent(video.note || ''); // Set the initial content of the note
                      }}
                    >
                      Add Note
                    </Button>

            
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add/Edit Note</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={(e) => {
                          e.preventDefault();
                          handleAddNote(video.videoId, noteContent);
                          handleCloseModal(); // Close the modal after adding/editing the note
                        }}>
                          <Form.Group controlId={`formNoteContent_${video.videoId}`}>
                            <Form.Label>Notes</Form.Label>
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
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedVideos;
