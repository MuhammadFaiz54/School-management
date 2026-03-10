// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true,
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     }
// }, {timestamps: true});

// module.exports = mongoose.model('User', userSchema);

const {sequelize} = require('../../config/mysql')
const {DataTypes} =  require('sequelize')

const User = sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdBy:{
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
    }
})
module.exports = User