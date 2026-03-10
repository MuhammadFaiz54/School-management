const { sequelize } = require('../../config/mysql')
const { DataTypes } = require('sequelize')

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model:'Roles',
            key:'id'
        }
    },
    permission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model:'Permissions',
            key:'id'
        }

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
module.exports = RolePermission