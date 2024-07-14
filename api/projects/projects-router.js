// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Project = require('./projects-model')

const { validateProjectId } = require('./projects-middleware')

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


//last
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'something happened within the projects router',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router 