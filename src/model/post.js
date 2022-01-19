const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');

class Post extends Model {}

Post.init({
    title:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
});

module.exports = Post;