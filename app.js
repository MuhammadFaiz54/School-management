const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/Auth/auth');
const roleRoutes = require('./routes/Role');
const authorRoutes = require('./routes/Author');
const { bookRoutes } = require('./routes/Book');

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);



module.exports = app