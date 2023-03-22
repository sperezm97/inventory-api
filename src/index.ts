import 'reflect-metadata';
import express, { type Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import AppDataSource from './config/dataSource';
import routes from './routes';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(errorMiddleware);

app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log('data base connected');

    app.listen(PORT, () => {
      console.log(`Running on ${PORT} ⚡`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log('database failed to connect');
  });
