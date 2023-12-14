const { User, Note } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // const userData = 

         const userWithNotes = await User.findOne({ _id: context.user._id }).populate('notes');
        return userWithNotes;
      }
      throw AuthenticationError;
    },
    getChannelData: async (parent, { channelName }, context) => {
      const url = 'https://youtube-v2.p.rapidapi.com/channel/id?channel_name=' + channelName;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8fba63d966msh00c2856b3750933p19960ejsn74beb5027bf8',
          'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const channelStatistics = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${result.channel_id}&key=AIzaSyCLjVLclOGVy4uIMGD5EEAK1r0LFKGjGJw`);
        const searchedStatistic = await channelStatistics.json();


        const options2 = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '54d11cd2eemsh454f58db3f8dfa5p11166bjsn44a3e0bd378b',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
          }
        };
        const channelPictureURL = `https://youtube138.p.rapidapi.com/channel/details/?id=${result.channel_id}&hl=en&gl=US`;
        const channelPictureURLData = await fetch(channelPictureURL, options2);
        const channelPictureURLResponse = await channelPictureURLData.json();
        console.log(channelPictureURLResponse);
        return {
          viewCount: searchedStatistic.items[0].statistics.viewCount.toString(),
          subscriberCount: searchedStatistic.items[0].statistics.subscriberCount.toString(),
          videoCount: searchedStatistic.items[0].statistics.videoCount.toString(),
          profilePictureURL: channelPictureURLResponse.avatar[0].url
        };
      } catch (error) {
        console.error(error);
      };
    },

    searchVideo: async (parent, { queriedTitle }, context) => {
      const url = 'https://yt-api.p.rapidapi.com/search?query=' + queriedTitle + '&type=video';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '960b967ce9msh6666b8331ce42fdp122b75jsn89f1498616db',
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const searchResults = await response.json();
        const mappedSearchResults = searchResults.data
          .map((video) => {
            if (video.title == "Shorts") {
              return;
            }
            let videoThumbnail;
            if (video.thumbnail && video.thumbnail.length > 0) {
              videoThumbnail = video.thumbnail[0].url;
            }
            return {
              title: video.title,
              videoID: video.videoId,
              thumbnailURL: videoThumbnail,
            }
          })
          .filter((video) => video !== undefined);
        return mappedSearchResults;
      } catch (error) {
        console.error(error);
      }
    },
    renderVideo: async (parent, { videoID }, context) => {
      {
        //fetching the video details according to videoID
        const url = 'https://yt-api.p.rapidapi.com/video/info?id=' + videoID;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '8fba63d966msh00c2856b3750933p19960ejsn74beb5027bf8', //Jushen's API Key
            'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
          }
        };
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          return {
            link: "https://www.youtube.com/watch?v=" + data.id,
            title: data.title,
            description: data.description,
            channelTitle: data.channelTitle,
            thumbnailURL: data.thumbnail[0].url
          };
        }
        catch (error) {
          console.error(error);
        }
      }
    },
  },


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveVideo: async (parent, { video }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedVideos: { ...video, notes: [] } } },
          { new: true }
        );

        return user;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeVideo: async (parent, { videoId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedVideos: { videoId } } },
          { new: true }
        );

        return user;
      }
      throw AuthenticationError;
    },
    createNote: async (parent, { videoId, content }, context) => {
      // Ensure the user is authenticated
      console.log('inside createNote\n')
      // console.log(NoteInput)
      console.log(context.user)
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a note.');
      }
      // console.log(NoteInput);
      // const { content, videoId } = NoteInput;

      // Create a new note
      const note = await Note.create({
        content,
        videoId,
        user: context.user._id,
      });

      console.log('right before newNote')
      console.log(note)
      // DO I NEED TO ADD THE NOTESCHEMA TO MONGOOSE IN THE CONFIG?
      // ********************************************************
      // ******************************************************
      // await newNote.save();
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { notes: note._id } },
        { new: true }
      );
      return user;
    },
    note: async (parent, args, context) => {
      if (context.user) {
        // const userData = 
        const note = await Note.findOne({ user: context.user._id, videoId: args.videoId });
        console.log(note);
        return note;
      }
      throw AuthenticationError;
    },
    deleteNote: async (parent, { noteId }, context) => {
      if (context.user) {
        try {
          // Find the note by ID and remove it
          const note = await Note.findByIdAndRemove(noteId);

          if (!note) {
            throw new Error('Note not found');
          }

          // Remove the note ID from the user's notes array
          await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { notes: note._id } },
            { new: true }
          );

          return await User.findOne({ _id: context.user._id }).populate('notes');
        } catch (error) {
          console.error(error);
          throw new Error('Failed to delete note');
        }
      }

      throw new AuthenticationError('You must be logged in to delete a note.');
    },
  },
};

module.exports = resolvers;
