import { useState } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Row
} from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { SAVE_VIDEO } from '../utils/mutations';
import Auth from '../utils/auth';
import { searchYtVideos } from '../utils/API';
import { getSavedVideoIds } from '../utils/localStorage';
import heroBackground from '../assets/hero-bg.png';
// import videoId from ''
// import videoBackground from '../assets/background-video.mp4';

const SearchVideos = () => {
  const [SaveVideo] = useMutation(SAVE_VIDEO)
  // create state for holding returned youtube api data
  const [searchedVideos, setSearchedVideos] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved videoId values
  const [savedVideoIds, setSavedVideoIds] = useState(getSavedVideoIds());

  // create method to search for videos and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const videoId = await searchYtVideos(searchInput);

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchYtVideos(searchInput);

      const { data } = response;
      console.log(data)
      // THIS SECTION BELOW NEEDS TO BE UPDATED WITH THE YOUTUBE API DATA STRUCTURE, I'VE ADDED 
      // VIDEOINFO TO THE ITEMS ARRAY FOR NOW
      const videoData = data.filter(search => search.type === "video").map((search) => {
        console.log(search, "search")
        if (search.type === "video") {
          return {
            videoId: search.videoId,
            title: search.title,
            description: search.description,
            thumbnailURL: search ? search.thumbnail[0].url : "",
            viewCount: search.viewCount,
            link: "https://www.youtube.com/embed/" + search.videoId,
            channelTitle: search.channelTitle
          }
        }
      });
      console.log(videoData, "videoData")
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
      await SaveVideo({ variables: { video: videoToSave } });
      // if video successfully saves to user's account, save book id to state
      setSavedVideoIds([...savedVideoIds, videoToSave.videoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
    
    <Container>
        <h4 className="p-5">
          {searchedVideos.length
            ? `Viewing ${searchedVideos.length} results:`
            : ''}
        </h4>
        {searchedVideos.map((video, index) => (
          <Row key={index} className="mb-4 align-items-start">
            <Col xs="12" md="4">
              <a href={video.link}>
                <img src={video.thumbnailURL} alt="video thumbnails" className="img-fluid" />
              </a>
            </Col>
            <Col xs="12" md="8" className="d-flex flex-column justify-content-between">
              <div>
                <h5>{video.title}</h5>
              </div>
              <div className="d-flex justify-content-start">
                <Button className='saveButton' onClick={() => handleSaveVideo(video.id)}>
                  Save
                </Button>
                <Button className='addNoteButton' onClick={() => handleAddNote(video.id)}>
                  Add Note
                </Button>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};
 
export default SearchVideos;




