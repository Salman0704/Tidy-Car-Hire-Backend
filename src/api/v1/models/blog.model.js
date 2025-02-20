


const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Comment extends Model {}
Comment.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Comment',
    timestamps: false // We're handling createdAt manually
});

// Define Blog model
class blogModel extends Model {}
blogModel.init({
    // _id: {
    //     type: DataTypes.STRING, // Use STRING for UUID
    //     primaryKey: true, // Set as primary key
    //     defaultValue: () => uuidv4(), // Generate a random UUID
    // },
    image: DataTypes.STRING,
    heading: DataTypes.STRING,
    description: DataTypes.TEXT,
    author: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Blog',
    timestamps: false
});

// Set up associations
blogModel.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(blogModel);


// Sync models with database
sequelize.sync();

module.exports = { blogModel, Comment};