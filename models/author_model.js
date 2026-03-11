const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const Author = sequelize.define('Author', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull:true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.UUID,
        allowNull:true,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
})
module.exports = Author