const {body} = require('express-validator')


const RoleAddValidation = [
body('name')
.notEmpty().withMessage("Name is required"),

]
module.exports = {
    RoleAddValidation
}