// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Project = require('./projects-model')

const { validateProjectId, validateProject, validateProjectAction } = require('./projects-middleware')

router.get('/' , (req, res, next) => {
    Project.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.get('/:id' , validateProjectId , (req, res) => {
    res.json(req.project)
})

router.post('/' , validateProject , (req, res) => {
    Project.insert({name : req.body.name , 
        description: req.body.description, 
        completed: req.body.completed})
    .then(newProject => {
        res.status(201).json(newProject)
    })
})

router.put('/:id' , validateProject, validateProjectId, (req, res, next) => {
    Project.update(req.params.id,
         {name : req.body.name , 
          description: req.body.description, 
          completed: req.body.completed})
    .then(() => {
        return Project.get(req.params.id)
    })
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(next)
})

router.delete('/:id' , validateProjectId , (req, res, next) => {
    Project.remove(req.params.id)
    .then(project => {
        res.json(req.project)
    })
    .catch(next)
})

router.get('/:id/actions' , validateProjectAction, (req, res) => {
    res.json(req.action)
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