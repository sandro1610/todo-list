import db from "../config/db.config.mjs";
import {Sequelize} from "sequelize";
import Activities from "./Activities.mjs";

const {DataTypes} = Sequelize;

const Todos = db.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notEmpty: true,
        }
    },
    activity_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
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
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: true,
        validate: {
            notEmpty: true,
        }
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true,
        }
    }
},{
    paranoid: true,
})


Activities.hasMany(Todos, {foreignKey: 'activity_group_id'});
Todos.belongsTo(Activities, {foreignKey: 'activity_group_id'});

export default Todos;
