const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    async getallUsers(req,res) {
        try{
          const users = await User.find().populate('thoughts').populate('friends');
          res.status(200).json(users);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async getUser(req,res) {
        try{
            console.log(req.params);
            const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
            console.log(user);
            res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },

    async createUser(req,res) {
        try{
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async deleteUser(req,res) {
        try{
          const user = await User.findOneAndDelete({_id: new ObjectId(req.params.userId)});
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
          res.status(200).json({ message: 'user deleted' });
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async updateUser(req,res) {
      try{
        const user = await User.findOneAndUpdate(
          {_id: req.params.userId},
          { $set: req.body },
          { runValidators: true, new: true }
          ).populate('thoughts').populate('friends');
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async addFriend(req,res) {
      console.log('you have added a new friend');
      try{
        const friend = await User.findOneAndUpdate(
          {_id: req.params.userId},
          {$addToSet: {friends: new ObjectId(req.params.friendId)}},
          { runValidators: true, new: true }
        );
        if (!friend) { 
          return res.status(404).json({ message: 'no friend to add' });
        }
        res.status(200).json(friend);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async deleteFriend(req,res) {
      console.log('you have deleted a friend');
      try{
        const friend = await User.findOneAndUpdate(
          {_id: req.params.userId},
          {$pull: {friends: new ObjectId(req.params.friendId)}},
          { runValidators: true, new: true }
        );
        if (!friend) { 
          return res.status(404).json({ message: 'no friend to delete' });
        }
        res.status(200).json({ message: 'friend deleted successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
    }
};