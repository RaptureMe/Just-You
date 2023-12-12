// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save video data for a logged in user
export const saveVideo = (videoData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(videoData),
  });
};

// remove saved video data for a logged in user
export const deleteVideo = (videoId, token) => {
  return fetch(`/api/users/videos/${videoId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to youtube videos api
// https://yt-api.p.rapidapi.com/search?query=' + args.query + '&type=video'
export const searchYtVideos = async (query) => {
  const url = `https://yt-api.p.rapidapi.com/search?query=${query}&type=video`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '960b967ce9msh6666b8331ce42fdp122b75jsn89f1498616db',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  };
};

export const searchYtChannel = async (query) => {
  const url = 'https://youtube-v2.p.rapidapi.com/channel/id?channel_name=' + query;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '960b967ce9msh6666b8331ce42fdp122b75jsn89f1498616db',
      'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${result.channel_id}&key=AIzaSyCLjVLclOGVy4uIMGD5EEAK1r0LFKGjGJw`);
    const search = await searchRes.json()
    console.log(search)
    return search;
  } catch (error) {
    console.error(error);
  }
  
};