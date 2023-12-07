import { useState } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';
import {useMutation} from "@apollo/client";
import {SAVE_VIDEO} from '../utils/mutations';
import Auth from '../utils/auth';
import { searchYtVideos} from '../utils/API';
import { getSavedVideoIds } from '../utils/localStorage';
import heroBackground from '../assets/hero-bg.png';
// import videoId from ''
// import videoBackground from '../assets/background-video.mp4';

const SearchVideos = () => {
  const [SaveVideo] = useMutation (SAVE_VIDEO)
  // create state for holding returned youtube api data
  const [searchedVideos, setSearchedVideos] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved videoId values
  const [savedVideoIds, setSavedVideoIds] = useState(getSavedVideoIds());

  // create method to search for videos and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const videoId = await searchYtVideos (searchInput);

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchYtVideos(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      // THIS SECTION BELOW NEEDS TO BE UPDATED WITH THE YOUTUBE API DATA STRUCTURE, I'VE ADDED 
      // VIDEOINFO TO THE ITEMS ARRAY FOR NOW
      const videoData = items.map((video) => ({
        videoId: video.id,
        authors: video.videoInfo.channels || ['No channel to display'],
        title: video.videoInfo.title,
        description: video.videoInfo.description,
        image: video.videoInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedVideos(videoData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a video to our database
  const handleSaveVideo = async (videoId) => {
    // find the video in `searchedVideos` state by the matching id
    const videoToSave = searchedVideos.find((video) => video.videoId === videoId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
    await SaveVideo({variables: {video: videoToSave}});
      // if video successfully saves to user's account, save book id to state
      setSavedVideoIds([...savedVideoIds, videoToSave.videoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Videos!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a video'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedVideos.length
            ? `Viewing ${searchedVideos.length} results:`
            : 'Search for a video to begin'}
        </h2>
        <Row>
          {searchedVideos.map((video) => {
            return (
              <Col md="4" key={video.videoId}>
                <Card border='dark'>
                  {video.image ? (
                    <Card.Img src={video.image} alt={`The thumbnail for ${video.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{video.title}</Card.Title>
                    <p className='small'>Channels: {video.channels}</p>
                    <Card.Text>{video.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedVideoIds?.some((savedVideoId) => savedVideoId === video.videoId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveVideo(video.videoId)}>
                        {savedVideoIds?.some((savedVideoId) => savedVideoId === video.videoId)
                          ? 'This video has already been saved!'
                          : 'Save this Video!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </> */}

        {/* Hero Section */}
        <div
        className="text-light bg-dark p-5"
        style={{
          backgroundImage: `url(${heroBackground})`,
          // backgroundVideo: `url(${videoBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
        }}
      >
        <Container>
          
          <Form onSubmit={handleFormSubmit}>
            <Row className='search-row'>
              <Col xs={12} md={6}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="sm"
                  placeholder="Search for any videos you like"
                />
              </Col>
              <Col xs={8} md={4}>
                <Button type="submit" variant="primary" size="sm">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      {/* Content Section */}
      <Container>
        <h2 className="pt-5">
          {searchedVideos.length
            ? `Viewing ${searchedVideos.length} results:`
            : ''}
        </h2>
        <Row>
          {searchedVideos.map((video) => (
            <Col md="4" key={video.videoId}>
              <Card border="dark">
                {/* our content  */}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchVideos;




