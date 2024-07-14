// Write your "actions" router here!

const express = require('express')
const router = express.Router()

const {validateAction, validateActionId, validateProjectId} = require('./actions-middlware')


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

router.post('/' , validateProjectId , validateAction , (req, res, next) => {
    const {project_id , description , notes , completed} = req.body
    Action.insert({ project_id , description , notes , completed})
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})


router.put('/:id' , validateAction , validateActionId, (req , res , next) => {
    Action.update(req.params.id , {
        project_id : req.body.project_id , 
        description: req.body.description,
        completed: req.body.completed, 
        notes: req.body.notes
    })
    .then(() => {
        return Action.get(req.params.id)
    })
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(next)
})


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