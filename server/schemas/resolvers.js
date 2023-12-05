const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    channelData: async (parent, args, context) => {
      const url = 'https://youtube-v2.p.rapidapi.com/channel/id?channel_name=' + args.query;
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
        return {
          viewCount: search.items[0].statistics.viewCount,
          subscriberCount: search.items[0].statistics.subscriberCount,
          videoCount: search.items[0].statistics.videoCount
        };
      } catch (error) {
        console.error(error);
      };
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
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { ...book } } },
          { new: true }
        );

        return user;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return user;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
