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

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
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
  // return fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${query}&key=${process.env.REACT_APP_KEY}`).then (response => response.json()).then (channelData => {
  //   fetch (`https://yt.lemnoslife.com/channels?handle=@${channelData.}`)
  // });
};