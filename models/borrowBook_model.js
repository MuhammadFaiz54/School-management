const { sequelize } = require('../config/mysql')
const { DataTypes } = require('sequelize')

const BorrowBook = sequelize.define('BorrowBook', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    book_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model:'Books',
            key:'id'
        }
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model:'Users',
            key:'id'
        }

    },
    returnDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM('borrowed', 'returned'),
        defaultValue:'borrowed'
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
module.exports = BorrowBook