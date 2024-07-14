// add middlewares here related to actions

const Action = require('./actions-model')
const Project = require('../projects/projects-model')

async function validateActionId (req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(action){
            req.action = action
            next()
        }else{
            next({status: 404, message: `${req.params.id} not found`})
        }

    } catch(error){
        res.status(500).json({
            message: 'Problem Finding Action'
        })
    }

}



async function validateAction (req, res, next) {
    const {project_id ,  description , notes , completed } = req.body
    if( !project_id || !description || !notes || completed === undefined || req.params.id === project_id){
        res.status(400).json({message: 'Please provide description, notes, and completed'})
    } else {
        req.body.description = description.trim()
        req.body.notes = notes.trim()
        next()
    }
   
}

async function validateProjectId(req, res, next) {
    const projectId = req.body.project_id

    try {
        const project = await Project.get(projectId)
        if (project) {
            req.project = project
            next()
        } else {
            return res.status(404).json({ message: `Project with ID ${projectId} not found.` })
        }
    } catch (error) {
        console.error('Error validating project ID:', error)
        res.status(500).json({ message: 'Error validating project ID.' })
    }
}







module.exports = {
    validateAction,
    validateActionId,
    validateProjectId,
}