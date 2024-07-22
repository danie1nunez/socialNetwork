const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    async getallUsers(req,res) {
        try{
          const users = await User.find();
          res.status(200).json(users);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    async getUser(req,res) {
        try{
            const user = await User.findOne({_id: new ObjectId(req.params.id)}).select('-__v');
           
            res.json(200)(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    async createUser(req,res) {
        try{
          const user = await User.create(req.body);
          res.json(200)(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    async deleteUser(req,res) {
        try{
          const user = await User.findOneAndDelete({_id: new ObjectId(req.params.id)});
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async updateUser(req,res) {
      try{
        const user = await User.findOneAndUpdate({_id: new ObjectId(req.params.id)});
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
        const user = await User.findOne({_id: new ObjectId(req.params.id)});
        const friend = await User.findOne({_id: new ObjectId(req.params.id)});
        if (!user) { 
          return res.status(404).json({ message: 'No such user exists' });
        }
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    }
};