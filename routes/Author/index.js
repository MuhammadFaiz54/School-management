const express = require('express')
const checkToken = require('../../middleware/token_middleware')
const CheckPermission = require('../../middleware/check_permission')
const { AddAutorValidation } = require('../../Validator/author_validator')
const { AddAuthorFn, GetAllAuthorFn, getauthorsaddUser, deleteAuthor } = require('../../controllers/Author')

const authorRoutes = express.Router()

authorRoutes.post('/add',checkToken,CheckPermission('add_author'),AddAutorValidation,AddAuthorFn)
authorRoutes.get('/all',checkToken,GetAllAuthorFn)
authorRoutes.get('/:id',checkToken,GetAllAuthorFn)
authorRoutes.get('/userId/:id',checkToken,getauthorsaddUser)
authorRoutes.delete('/delete/:id',checkToken,CheckPermission('remove_author'),deleteAuthor)




module.exports = authorRoutes