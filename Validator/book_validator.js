const { body } = require('express-validator')

const BookAddValidation = [
    body('name')
        .notEmpty().withMessage("Please add Author name")
        .isLength({ min: 3 }).withMessage("Please type valid name minmum 3 charactes"),
    body('author_id')
    .notEmpty().withMessage("Author id required if you add direct book so please first add author then book")
]
module.exports = BookAddValidation