const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model:'Authors',
            key:'id'
        }

    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    createdBy: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
})
module.exports = Book