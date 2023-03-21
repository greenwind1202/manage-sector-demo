import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import SectorRouter from './routes/sector-router';
import db from './db';

dotenv.config();

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', SectorRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
