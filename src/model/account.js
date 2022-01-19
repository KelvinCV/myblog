const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');
const Profile = require('./profile');
const Post = require('./post');


class Account extends Model {}

Account.init({
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
});

Account.hasOne(Profile);
Profile.belongsTo(Account);

Account.hasMany(Post);
Post.belongsTo(Account);

module.exports = Account;