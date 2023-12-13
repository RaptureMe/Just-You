import "../assets/RenderVideo.css";
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import { useParams } from "react-router";
import { useQuery, useLazyQuery } from '@apollo/client';
import { Spinner } from "react-bootstrap";
import likesImage from "../assets/commentLikeIcon.jpeg";
import movieTheatre from "../assets/renderedVideoBackground.png"
import { RENDER_VIDEO, GET_CHANNELDATA, GET_RECOMMENDED, GET_COMMENTS } from "../utils/queries";

const RenderVideo = () => {
  const navigate = useNavigate();
  const sourceElementRef = useRef(null);
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [recommendedData, setRecommendedData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [getChannelData, { loadingOne }]  = useLazyQuery(GET_CHANNELDATA, {
    onCompleted: (completedData) => {
      console.log(completedData);
      setChannelData(completedData.getChannelData);
    },
  });

  const renderNextVideoPage = async (videoId) => {
    setRecommendedData([]);
    navigate(`/renderVideo/${videoId}`);
  }

  useQuery(RENDER_VIDEO, {
    variables: { videoId: videoId },
    onCompleted: (completedData) => {
      console.log(completedData);
      setVideoData(completedData.renderVideo);
      getChannelData({ variables: { channelName: completedData.renderVideo.channelTitle } });
    },
  });

  useEffect(() => {
    const fetchComments = async () => {
      const url = `https://youtube-v2.p.rapidapi.com/video/comments?video_id=${videoId}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8fba63d966msh00c2856b3750933p19960ejsn74beb5027bf8',
          'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const videoComments = result.comments.map((comment) => ({
          commenterName: comment.author_name,
          commentLikes: comment.like_count,
          commentDate: comment.published_time,
          commentText: comment.text,
          commentProfilePicture: comment.thumbnails[0].url,
        }));
        setCommentData(videoComments);
      } catch (err) {
        console.error(err);
      }
    };

    console.log(commentData);


    setTimeout(fetchComments, 2000);

  }, [videoId])



  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      const url = 'https://youtube-v2.p.rapidapi.com/video/recommendations?video_id=' + videoId;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8fba63d966msh00c2856b3750933p19960ejsn74beb5027bf8',
          'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        let recommendedVideos;
        if (data) {
          recommendedVideos = data.videos.map((video) => ({
            videoId: video.video_id,
            title: video.title,
            author: video.author,
            viewcount: video.number_of_views,
            thumbnail: video.thumbnails[0].url,
            publishedTime: video.published_time,
            videoLength: video.video_length,
          }));
        }
  
        setRecommendedData(recommendedVideos);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchRecommendedVideos();
  },[videoId])


  return (loadingOne && loadingTwo) ? (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spinner animation="border" variant="primary" style={{ borderWidth: "0.9em", width: "10rem", height: "10rem" }} />
    </div>
  ) : (
    <div id = "renderVideoPage">
      <div>
      <div id = "commentsAndVideoContainer">
        <div id="videoContainer">
          <div>
            <div id = "videoAndBackgroundContainer">
              <div id = "videoAndBackground">
                <div>
                  {videoData && (
                    <ReactPlayer
                      url={videoData.link}
                      ref={sourceElementRef}
                      playing
                      loop
                      controls
                      className="formattedVideo"
                    />
                  )}
                </div>
                <img className = "backgroundImage" src = {movieTheatre}></img>
              </div>
            </div>
            <div id = "renderedVideoDetails">
              <div className="linebreak"></div>
              <div id = "videoTitle" className="videoDetails">{videoData && videoData.title}</div>
              <div className="linebreak"></div>
              <div id = "channelContainer">
                <div id = "channelAuthorContainer" className="videoDetails">
                  <div>{videoData && videoData.channelTitle}</div>
                  <div>
                  {channelData && channelData.profilePictureURL && (
                    <img id="channelProfilePic" src={channelData.profilePictureURL}/>)
                  }
                  </div>
                </div>
                <div className="videoDetails">
                  {channelData && parseInt(channelData.subscriberCount).toLocaleString()} subscribers
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className = "linebreak"></div>
        {(commentData) ? (
        <div id = "commentSectionContainer">
          <div id = "commentSectionInfoContainer">
            <div id = "commentCount">{commentData && commentData.length} Comments</div>
            <div className = "linebreak"></div>
          </div>
          {commentData && commentData.map((comment, index) => (
            <div id = "commentContainer" key = {index}>
              <img id = "commentProfilePic" src = {comment.commentProfilePicture}></img>
              <div id = "commentContent">
                <div id = "commenterInfo">
                  <div id = "commenterName">{comment.commenterName}</div>
                  <div id = "commentDate">{comment.commentDate}</div>
                </div>
                <div id = "commentTextContainer">
                  <p id = "commentText">{comment.commentText}</p>
                </div>
                <div id = "likesContainer">
                  <img id = "likesImage" src = {likesImage}></img>
                  <div id = "likes">{comment.commentLikes}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
        <div id = "commentSectionInfoContainer">
            <div id = "commentCount">No Comments Available</div>
            <div className = "linebreak"></div>
            <input id = "addCommentInput" placeholder = "Be the first to add a comment..."></input>
        </div>
        )}
        </div>
      </div>
      <div id = "recommendedSectionContainer">
        {(recommendedData) ? (
          recommendedData.map((video, index) => (
            <div key={index} id = "recommendedVideoContainer" data-video-id = {video.videoId} onClick = {() => renderNextVideoPage(video.videoId)}>
              <div>
                <img id = "recommendedThumbnail" src = {video.thumbnail}></img>
                <div id={`${video.videoLength.length < 6 ? 'videoLengthBackground' : 'videoLengthBackgroundWider'}`}>
                  <div id="videoLength">{video.videoLength}</div>
                </div>
              </div>
              <div id = "recommendedDetails">
                <div className="linebreak"></div>
                <div id = "recommendedTitle" className = "truncate">{video.title}</div>
                <div className="linebreak"></div>
                <div id = "recommendedChannel">{video.author}</div>
                <div className="linebreak"></div>
                <div id = "recommendedViewCount">{Number(video.viewcount).toLocaleString()} views</div>
              </div>
            </div>
          ))
        ) : (
          <div id = "noRecommendedVideos">No Recommended Videos</div>
        )}
      </div>
    </div>
  );
};

export default RenderVideo;
