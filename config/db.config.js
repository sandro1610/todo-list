import {Sequelize} from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
    `${process.env.MYSQL_DBNAME}`,
    `${process.env.MYSQL_USER}`,
    `${process.env.MYSQL_PASSWORD}`,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql'
    }
)

export default db;