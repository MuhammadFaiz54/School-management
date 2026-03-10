const express = require('express')
const checkToken = require('../../middleware/token_middleware')
const { RoleAddValidation } = require('../../Validator/role_validator')
const { RoleCreateFn, RoleGetFn, RoleGetForSpacificFn } = require('../../controllers/Role')

const roleRoutes = express.Router()
roleRoutes.post('/',checkToken,RoleAddValidation,RoleCreateFn)
roleRoutes.get('/:id/roles',checkToken,RoleGetForSpacificFn)


module.exports = roleRoutes