
const router = require('express').Router();
const { Thought, User, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', async (req,res)=> {
    try {
       const thoughts = await Thought.find ({})
        .populate('reactions')
       res.status(200).json(thoughts)
    } catch(err){
        console.log(err)
    res.status(500).json(err)
    }
});

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', async (req,res)=> {
   try {
       const newThought = await Thought.create(req.body)
       const updatedUser = await User.findOneAndUpdate({ _id: req.body.userId }, {$push: {thoughts: newThought._id}}, {runValidators: true, new: true})
      res.status(200).json(newThought)
   } catch(err) {
    console.log(err)
    res.status(500).json(err)
   }
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', async (req,res)=> {
    try {
        const singleThought = await Thought.findOne({ _id: req.params.thoughtId })
        res.status(200).json(singleThought)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
       }

})

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/', async (req,res)=> {
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.body.thoughtId }, {$set: req.body}, {runValidators: true, new: true})
        console.log("HEEEEEEEEEY", updatedThought)
        res.status(200).json(updatedThought)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
       }

})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req,res)=> {

});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', async (req,res)=> {
    try {
        const newReaction = await Reaction.create(req.body)
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$push: {reactions: newReaction._id}}, {runValidators: true, new: true})
        res.status(200).json(newReaction)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {

})

module.exports = router;
