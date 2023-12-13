import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {Container,Col,Form,Button,Row} from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { SAVE_VIDEO } from '../utils/mutations';
import Auth from '../utils/auth';
import { searchYtVideos } from '../utils/API';
import { getSavedVideoIds } from '../utils/localStorage';
import justyouvid from '../assets/background-video.mp4';
import heroBackground from '../assets/hero-bg.png';

const SearchVideos = () => {
  const navigate = useNavigate();

  const [SaveVideo] = useMutation(SAVE_VIDEO)
  // create state for holding returned youtube api data
  const [searchedVideos, setSearchedVideos] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved videoId values
  const [savedVideoIds, setSavedVideoIds] = useState(getSavedVideoIds());
  const [videoEnded, setVideoEnded] = useState(false);

  const renderVideoPage = async (videoId) => {
    navigate(`/renderVideo/${videoId}`);
  }
  
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }

    // Check if the user has already visited the site
    if (hasVisited) {
      setVideoEnded(true);
    }
  }, []);

  // method to search for videos and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchYtVideos(searchInput);
      const { data } = response;
      console.log(data)
     
      const videoData = data.filter(search => search.type === "video").map((search) => {
        console.log(search, "search")
        if (search.type === "video") {
          return {
            videoId: search.videoId,
            title: search.title,
            description: search.description,
            thumbnailURL: search ? search.thumbnail[0].url : "",
            viewCount: search.viewCount,
            link: "https://www.youtube.com/watch?v=" + search.videoId,
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


    // Function to check if a video is saved
  const isVideoSaved = (videoId) => savedVideoIds.includes(videoId);
  // handle saving a video to our database
  const handleSaveVideo = async (videoId) => {
    // find the video in `searchedVideos` state by the matching id
    const videoToSave = searchedVideos.find((video) => video.videoId === videoId);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await SaveVideo({
        variables: {
          video: {
            videoId: videoToSave.videoId,
            title: videoToSave.title,
            description: videoToSave.description,
            thumbnailURL: videoToSave.thumbnailURL,
            link: videoToSave.link,
            channelTitle: videoToSave.channelTitle
          }
        }
      });
      // if video successfully saves to user's account, save video id to state
      setSavedVideoIds([...savedVideoIds, videoToSave.videoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="vid-container">
        {videoEnded ? (
          <div
            className="text-light bg-dark p-5 hero"
            style={{
              backgroundImage: `url(${heroBackground})`,
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
                      size="lg"
                      placeholder="Search for any videos you like"
                    />
                  </Col>
                  <Col xs={8} md={4}>
                    <Button type="submit" variant="primary" size="lg">
                       Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
        ) : (
          <video
            id="myVideo"
            src={justyouvid}
            autoPlay
            muted
            style={{
              width: '100%',
              height: '70vh',
              objectFit: 'cover',
              boxShadow: '20px 20px 20px #888888',
            }}
            onEnded={() => setVideoEnded(true)}
          />
        )}
      </div>
      <Container>
        <h4 className="p-5">
          {searchedVideos.length
            ? `Viewing ${searchedVideos.length} results:`
            : ''}
        </h4>
        {searchedVideos.map((video, index) => (
          <Row key={index} className="mb-4 align-items-start pointerEffect" >
            <Col xs="12" md="4">
              <a>
                <img src={video.thumbnailURL} alt="video thumbnails" className="img-fluid" data-video-id = {video.videoId} onClick = {() => renderVideoPage(video.videoId)}/>
              </a>
            </Col>
            <Col xs="12" md="8" className="d-flex flex-column justify-content-between">
              <div>
                <h5>{video.title}</h5>
              </div>
              <div className="d-flex justify-content-start">
                <Button
                  className='saveButton'
                  onClick={() => handleSaveVideo(video.videoId)}
                  disabled={isVideoSaved(video.videoId)}
                >
                  {isVideoSaved(video.videoId) ? 'Saved' : 'Save'}
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



