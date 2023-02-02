import db from "../config/db.config.mjs";
import {Sequelize} from "sequelize";

const {DataTypes} = Sequelize;

const Activities = db.define('activities', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
        validate: {
            notEmpty: true,
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notEmpty: false,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notEmpty: false,
        }
    }
},{
    paranoid: true,
})

export default Activities;