const {body} =  require ('express-validator')

const RegisterValidation = [
    body('name')
    .notEmpty().withMessage('Name Required')
    .isLength({min:3}).withMessage('Please type a valid name'),

    body('email')
    .notEmpty().withMessage('Email Required')
    .isEmail().withMessage('Please type a valid email'),

    body('password')
    .notEmpty().withMessage("password must me required")
    .isLength({min:6}).withMessage('Password atleast 6 digits')
]

const LoginValidation = [
    body('email')
    .notEmpty().withMessage('Email Required')
    .isEmail().withMessage('Please type a valid email'),

    body('password')
    .notEmpty().withMessage("password must me required")
]

module.exports = {
    RegisterValidation,
    LoginValidation
}