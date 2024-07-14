// add middlewares here related to actions

const Action = require('./actions-model')

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
    const { description , notes , completed } = req.body
    if( !description || !notes || completed === undefined || req.params.id === project_id){
        res.status(400).json({message: 'Please provide description, notes, and completed'})
    } else {
        req.body.description = description.trim()
        req.body.notes = notes.trim()
        next()
    }
   
}







module.exports = {
    validateAction,
    validateActionId
}