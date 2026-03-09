const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/',async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/register',async (req,res)=> {
    try {
        const {name, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, hashPassword})
        await user.save();
        res.status(201).json({message: 'User registered successfully', user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

})
router.post('/login/',async(req, res)=> {
try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        return res.status(404).json({message: 'Invalid credentials'});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    return res.status(404).json({message: 'Invalid credentials'});
  }
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET ,{expiresIn: '1d'});
  res.status(200).json({message: 'Login successful', token});
} catch (error) {
    res.status(500).json({message: error.message});
}
})

module.exports = router;