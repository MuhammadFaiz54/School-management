const {validationResult} = require('express-validator')
const User = require('../../models/authorization/user')
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')
const RegisterFn = async (req,res)=> {
    try {
        const checkValidaton = validationResult(req)
        if (!checkValidaton.isEmpty()){
            return res.status(400).json({message:checkValidaton.array()})
        }

        const {name, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const userExist = await User.findOne({where:{email}})
        if (userExist){
            return res.status(400).json({message:"Email already Exist in database"})
        }
        const user = await User.create({
            name, 
            email, 
            password:hashPassword})
        // await user.save();
        res.status(201).json({message: 'User registered successfully', user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
const LoginFn = async (req,res)=> {
    try {
        const checkValidaton = validationResult(req)
        if (!checkValidaton.isEmpty()){
            return res.status(400).json({message:checkValidaton.array()})
        }

        const {email, password} = req.body;
        console.log("email===",email);
        
        const userExist = await User.findOne({where:{email}})
        if (!userExist){
            return res.status(400).json({message:"Email not found"})

        }
        const checkPass = await bcrypt.compare(password, userExist.password);
        if (!checkPass){
            return res.status(400).json({ message: "Invalid credintials" })
        }
        const token = Jwt.sign(
            {id:userExist.id},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        res.cookie('token',token,{
            httpOnly: true,
            sameSite: 'strict',
        })

        res.status(200).json({message: 'User registered successfully', userExist,});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
module.exports = {
    RegisterFn,
    LoginFn
}