import 'reflect-metadata';
import express, { type Express, type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import AppDataSource from './config/dataSource';
import routes from './routes';

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});

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
