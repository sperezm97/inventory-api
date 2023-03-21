import { DataSource } from 'typeorm';
import { InventoryType, Item, Transaction, StockPerStorage, Storage } from '../models';
import { TransactionSubscriber } from '../subscribers';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [InventoryType, Transaction, Item, Storage, StockPerStorage],
  subscribers: [TransactionSubscriber],
  migrations: [],
});

export default AppDataSource;
