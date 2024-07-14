// Write your "actions" router here!

const express = require('express')
const router = express.Router()

const {validateAction, validateActionId} = require('./actions-middlware')


const Action = require('../actions/actions-model')


router.get('/' , (req, res, next) => {
    Action.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.get('/:id' , validateActionId , (req, res) => {
    res.json(req.action)
})

// router.post('/' , validateActionId , validateAction , (req, res) => {
//     Action.insert(
//        req.body)
//     .then(newAction => {
//         res.status(201).json(newAction)
//     })
// })


// router.put('/:id' , (req , res , next) => {

// })

router.delete('/:id' , validateActionId , (req, res , next) => {
    Action.remove(req.params.id)
    .then(action => {
        res.json(req.action)
    })
    .catch(next)
})



//last
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'something happened within the projects router',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router 