const express = require('express')
const checkToken = require('../../middleware/token_middleware')
const { RoleAddValidation, RoleAssignValidation } = require('../../Validator/role_validator')
const { RoleCreateFn, RoleGetFn, RoleGetForSpacificFn, AssignRoleFn } = require('../../controllers/Role')
const CheckPermission = require('../../middleware/check_permission')

const roleRoutes = express.Router()
roleRoutes.post('/',checkToken,RoleAddValidation,RoleCreateFn)
roleRoutes.get('/roles',checkToken,RoleGetFn)
roleRoutes.get('/:id/roles',checkToken,RoleGetForSpacificFn)

roleRoutes.post('/assign_role',checkToken,CheckPermission('assign_role'),RoleAssignValidation,AssignRoleFn)


module.exports = roleRoutes