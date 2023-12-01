const { validationResult} = require('express-validator')
const User = require('../models/user')

exports.signup = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error("Validation Failed.")
        error.statusCode = 422;
        error.data = error.array();
        throw error;
    }

    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

}
