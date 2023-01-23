import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.config.js";
import ActivitiesRoute from "./routes/ActivitiesRoutes.js";
import TodosRoute from "./routes/TodosRoutes.js";
dotenv.config();
const app = express();
await db.sync({alter: true});

app.use(cors({
    credentials: true,
    origin: '*',
}));

app.use(express.json());

app.use(ActivitiesRoute);
app.use(TodosRoute);

app.listen(process.env.APP_PORT, () => { console.log('listening on port ' + process.env.APP_PORT); });


db.authenticate().then(() => {
    console.log('Database authenticated');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
