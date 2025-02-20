
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your Sequelize instance
const { v4: uuidv4 } = require('uuid');

const adminModel = sequelize.define('Admin', {
    _id: {
        type: DataTypes.STRING, // Use STRING for UUID
        primaryKey: true, // Set as primary key
        defaultValue: () => uuidv4(), // Generate a random UUID
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true, // Equivalent to not setting `required` in Mongoose
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Equivalent to `unique: true` in Mongoose
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'), // Equivalent to `enum` in Mongoose
        defaultValue: 'male', // Equivalent to `default` in Mongoose
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'admins', // Optional: Explicitly set the table name
    timestamps: true, // Optional: Adds `createdAt` and `updatedAt` fields
});

module.exports = adminModel;