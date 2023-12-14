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
import { REMOVE_VIDEO, CREATE_NOTE, GET_NOTE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from '../utils/auth';
import { removeVideoId } from '../utils/localStorage';




const SavedVideos = () => {

  const [showModal, setShowModal] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const [RemoveVideo] = useMutation(REMOVE_VIDEO, {
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
 
  


  // console.log(data);
  const savedVideos = data?.me.savedVideos || [];
  const notes = data?.me.notes || [];
  console.log(notes); // Added console.log to see the 'notes' variable

 
  // accepting the video's mongo _id value as param and deletes the video from the database
  const handleDeleteVideo = async (videoId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await RemoveVideo({ variables: { videoId } });
      // upon success, remove video's id from localStorage
      removeVideoId(videoId);
    } catch (err) {
      console.error(err);
    }
  };

  //  opening and closing the modal
  const handleShowModal = (video, index) => {
    setSelectedVideo(video);
    setSelectedVideoIndex(index);
    setNoteContent(video.note || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  // CHECK THIS TO SEE IF CORRECT
  const handleAddNote = async (content) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token || selectedVideoIndex === null) {
      return false;
    }
    const videoId = savedVideos[selectedVideoIndex].videoId;
    try {
      console.log(content)
      // const NoteInput = {"videoId": videoId, "content": content}
      console.log('add note')
      // console.log(NoteInput)
      await CreateNote({ variables: { videoId, content } });
      await refetch();
      handleCloseModal();
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
          <h1>Saved Videos</h1>
        </Container>
      </div>
      <Container>
        <h3 className='pt-5'>
          {savedVideos.length
            ? `Viewing ${savedVideos.length} saved ${savedVideos.length === 1 ? 'video' : 'videos'}:`
            : 'You have no saved videos!'}
        </h3>
        {savedVideos.map((video, index) => (
          <Row key={index} className="my-3">
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
                className='addButton btn-block btn-primary'
                onClick={() => handleShowModal(video, index)}
              >
                Add Note
              </Button>

              <div>
    <h6 className='renderedNotes'>Notes:</h6>
    {notes.filter((note) => note.videoId === video.videoId)
                  .map((note, noteIndex) => (
                    <li className='savednotes' key={noteIndex}>
                      <em>{note.content}</em>
                    </li>
    ))}
  </div>
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
              handleAddNote( noteContent); // WE'RE GETTING ERRORS SAYING VIDEOID IS UNDEFINED AND I COUDLDN'T FIGURE IT OUT
              handleCloseModal();
            }}>
              <Form.Group controlId={savedVideos || `formNoteContent_${savedVideos[0].videoId}`}>
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


