const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/Auth/auth');
const roleRoutes = require('./routes/Role');

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);


module.exports = app