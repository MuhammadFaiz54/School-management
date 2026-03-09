const { Sequelize } = require('sequelize')
const mysql2 = require('mysql2/promise')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)

const connectMySQL = async () => {
    try {
        const conn = await mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })
        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``)
        await conn.end()

        await sequelize.authenticate()
        console.log('MySQL connected ✅')
    } catch (error) {
        console.log('MySQL Error:', error.message)
    }
}
module.exports = {
    sequelize,
    connectMySQL
}