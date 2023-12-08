import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import {REMOVE_VIDEO} from "../utils/mutations";
import {QUERY_ME} from "../utils/queries";
import Auth from '../utils/auth';
import { removeVideoId } from '../utils/localStorage';

const SavedVideos = () => {
  const [RemoveVideo] = useMutation (REMOVE_VIDEO, {
    refetchQueries: [
      QUERY_ME,
      'Me'
    ]
  });
  const {loading, data} = useQuery (QUERY_ME);
  console.log(data);
  const savedVideos = data?.me.savedVideos || []

  // create function that accepts the video's mongo _id value as param and deletes the video from the database
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

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Your saved videos!</h1>
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
