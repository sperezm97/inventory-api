/* eslint-disable class-methods-use-this */
import { EventSubscriber, type EntitySubscriberInterface, type InsertEvent } from 'typeorm';
import AppDataSource from '../config/dataSource';
import { Item, StockPerStorage, Transaction } from '../models';

@EventSubscriber()
export default class TransactionSubscriber implements EntitySubscriberInterface<Transaction> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  listenTo(): string | Function {
    return Transaction;
  }

  beforeInsert(event: InsertEvent<Transaction>): void {
    const { entity } = event;

    entity.cost = entity.quantity * entity.item.unitPrice;
  }

  async afterInsert(event: InsertEvent<Transaction>): Promise<void> {
    const { entity } = event;
    const itemRepo = AppDataSource.getRepository(Item);

    let stockPerStorage = entity.item.stock;

    switch (entity.transactionType) {
      case 'entry':
        stockPerStorage += entity.quantity;
        break;
      case 'adjustment':
        stockPerStorage = entity.quantity;
        break;
      case 'departure':
        stockPerStorage -= entity.quantity;
        break;
      case 'transfer':
        stockPerStorage -= entity.quantity;
        break;

      default:
        break;
    }

    await itemRepo.update(entity.item.id, {
      stock: stockPerStorage,
    });

    const storageRepo = AppDataSource.getRepository(StockPerStorage);
    const storage = new StockPerStorage();
    storage.item = entity.item;
    storage.storage = entity.storage;
    storage.quantity = entity.quantity;

    await storageRepo.save(storage);
  }
}
