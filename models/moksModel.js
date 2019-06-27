const Sequelize = require('sequelize');
const sequelize = require('../data/database');


const User = sequelize.define(
    'userm', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        avatar:{
            type:Sequelize.TEXT,
            defaultValue: 'avatar.png'
        }
    }
);


module.exports = User;