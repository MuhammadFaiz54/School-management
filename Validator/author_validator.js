const {body} = require('express-validator')

const AddAutorValidation = [
    body('name')
    .notEmpty().withMessage("Please add Author name")
    .isLength({min:3}).withMessage("Please type valid name minmum 3 charactes")
]
module.exports ={
    AddAutorValidation
}