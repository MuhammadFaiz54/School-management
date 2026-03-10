const express = require('express');
const User = require('../../models/authorization/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RegisterValidation, LoginValidation } = require('../../Validator/auth.validator');
const {RegisterFn,LoginFn} = require('../../controllers/Auth/register_login_con');
const router = express.Router();

router.get('/',async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/register',RegisterValidation,RegisterFn)
router.post('/login/',LoginValidation,LoginFn)

module.exports = router;