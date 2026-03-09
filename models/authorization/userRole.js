const {sequelize} = require('../../config/mysql')
const {DataTypes} = require('sequelize')

const UserRole = sequelize.define('UserRole',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true

    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'Users',
            key:'id'
        }
    },
    role_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'Roles',
            key:'id'
        }
    },
    createdby:{
        type:DataTypes.UUID,
        references:{
            model:'Users',
            key:'id'
        }

    },
    updatedBy:{
        type:DataTypes.UUID,
        references:{
            model:'Users',
            key:'id'
        }

    },
})
module.exports = UserRole