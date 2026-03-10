const Jwt = require('jsonwebtoken')
const checkToken = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log('Cookie:', req.cookies)  // ⬅️ ye add karo
        console.log('Token:', token)          // ⬅️ ye add karo
        if (!token) {
            return res.status(401).json({ message: "unauthorized" })
        }
        const checkValidToken = Jwt.verify(token, process.env.JWT_SECRET)
        if (!checkValidToken) {
            return res.status(401).json({ message: "Check Your Token" })
        }
        req.user = checkValidToken
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }

}
module.exports = checkToken