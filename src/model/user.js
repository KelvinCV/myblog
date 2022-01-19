const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
})

module.exports = User;