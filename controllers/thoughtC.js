const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    async getallThoughts(req,res) {
        try{
          const thoughts = await Thought.find();
          res.status(200).json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async getThought(req,res) {
        try{
            const thought = await Thought.findById(req.params.thoughtId).select('-__v');
            if (!thought) {
              return res.status(404).json({ message: 'No such thought exists' });
            }
            res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async createThought(req,res) {
        try{
          const thought = await Thought.create(req.body);
          await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: {thoughts: new ObjectId(thought._id)}},
            { runValidators: true, new: true }
          );
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
          console.log(err)
        }
    },

    async deleteThought(req,res) {
        try{
          const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
          if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
          }
          res.status(200).json({message: "thought deleted successfully"});
        } catch (err) {
          res.status(500).json(err);
          console.log(err)
        }
    },

    async updateThought(req,res) {
      try{
        const thought = await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
          );
        if (!thought) {
          return res.status(404).json({ message: 'No such thought exists' });
        }
        res.status(200).json(thought);
      } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
    },

    async thoughtReaction(req, res) {
        console.log('youve reacted to a thought!')
        try{
          const reaction= await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          {$addToSet: {reactions: req.body}},
          { runValidators: true, new: true }
          )
          if (!reaction) { 
            return res.status(404).json({ message: 'cant add reaction' });
          }
          res.status(200).json(reaction)
        }catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
    },

    async deleteReaction(req, res) {
        console.log('youve reacted to a thought!')
        try{
          const reaction= await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          {$pull: {reactions: {reactionId: req.params.reactionId}}},
          { runValidators: true, new: true }
          )
          if (!reaction) { 
            return res.status(404).json({ message: 'cant delete reaction' });
          }
          res.status(200).json({ message: 'reaction deleted successfully' })
        }catch (err) {
          res.status(500).json(err);
          console.log(err)
      }
    }
};