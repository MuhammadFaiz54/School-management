const express = require('express')
const checkToken = require('../../middleware/token_middleware')
const CheckPermission = require('../../middleware/check_permission')
const BookAddValidation = require('../../Validator/book_validator')
const { AddBookFn } = require('../../controllers/Book')

const bookRoutes = express.Router()
bookRoutes.post('/add',checkToken,CheckPermission('add_book'),BookAddValidation,AddBookFn)
module.exports={bookRoutes}