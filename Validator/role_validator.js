const { body } = require('express-validator')


const RoleAddValidation = [
    body('name')
        .notEmpty().withMessage("Name is required"),

]

const RoleAssignValidation = [
    body('user_id')
        .notEmpty().withMessage("user_id is required"),
    body('role_id')
        .notEmpty().withMessage("user_id is required"),
]
module.exports = {
    RoleAddValidation,
    RoleAssignValidation
}