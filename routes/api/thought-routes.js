
const router = require('express').Router();
const { Thought, User, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', async (req,res)=> {
    try {
       const thought = await Thought.find ({})
       res.status(200).json(thought)
    } catch(err){
        console.log(err)
    res.status(500).json(err)
    }
});

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', async (req,res)=> {
   try {
       const thought = await Thought.create(req.body)
       const updatedUser = await User.findOneAndUpdate({ _id: req.body.userId }, {$push: {thoughts: thought._id}}, {runValidators: true, new: true})
      res.status(200).json(thought)
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
router.post('/:thoughtId/reactions', (req,res)=> {

});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {

})

module.exports = router;
