export const getSavedVideoIds = () => {
  const savedVideoIds = localStorage.getItem('saved_videos')
    ? JSON.parse(localStorage.getItem('saved_videos'))
    : [];

  return savedVideoIds;
};

export const saveVideoIds = (videoIdArr) => {
  if (videoIdArr.length) {
    localStorage.setItem('saved_videos', JSON.stringify(videoIdArr));
  } else {
    localStorage.removeItem('saved_videos');
  }
};

export const removeVideoId = (videoId) => {
  const savedVideoIds = localStorage.getItem('saved_videos')
    ? JSON.parse(localStorage.getItem('saved_videos'))
    : null;

  if (!savedVideoIds) {
    return false;
  }

  const updatedSavedVideoIds = savedVideoIds?.filter((savedVideoId) => savedVideoId !== videoId);
  localStorage.setItem('saved_videos', JSON.stringify(updatedSavedVideoIds));

  return true;
};
