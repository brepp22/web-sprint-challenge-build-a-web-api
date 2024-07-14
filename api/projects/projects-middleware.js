// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try{
        const project = await Project.get(req.params.id)
        if(project){
            req.project = project 
            console.log(req.project)
            next()
        } else{
            next({ status: 404 , message: `${req.params.id} not found`})
        }
    }catch(error){
        res.status(500).json({
            message: 'Problem Finding User'
        })
    }
}

function validateProject(req, res, next) {

}

function validateProjectAction(req, res, next){

}

module.exports = {
    validateProject,
    validateProjectId,
    validateProjectAction,
}