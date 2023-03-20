import AppDataSource from '../config/dataSource';
import { Item, Storage, StockPerStorage } from '../models';

export const createStockPerStorage = async (
  body: Pick<StockPerStorage, 'quantity'> & {
    itemId: number;
    storageId: number;
  }
): Promise<StockPerStorage> => {
  const { itemId, storageId, quantity } = body;
  const stockInStorage = new StockPerStorage();

  const StockPerStorageRepository = AppDataSource.getRepository(StockPerStorage);

  const ItemRepository = AppDataSource.getRepository(Item);
  const StorageRepository = AppDataSource.getRepository(Storage);

  const item = await ItemRepository.findOne({
    where: {
      id: itemId,
    },
  });

  if (item === null) {
    throw new Error('Item not found');
  }

  const storage = await StorageRepository.findOne({
    where: {
      id: storageId,
    },
  });

  if (storage === null) {
    throw new Error('Storage not found');
  }
  stockInStorage.quantity = quantity;
  stockInStorage.storage = storage;
  stockInStorage.item = item;

  return StockPerStorageRepository.save(stockInStorage);
};

export const getStockPerStorageById = async (id: number): Promise<StockPerStorage> => {
  const StockPerStorageRepository = AppDataSource.getRepository(StockPerStorage);

  const stock = await StockPerStorageRepository.findOne({
    where: {
      id,
    },
    relations: {
      storage: true,
      item: true,
    },
  });

  if (stock === null) {
    throw new Error('Stock not found');
  }

  return stock;
};

export const putStockPerStorageById = async (
  id: number,
  payload: Pick<StockPerStorage, 'quantity'>
): Promise<StockPerStorage> => {
  const { quantity } = payload;

  const StockPerStorageRepository = AppDataSource.getRepository(StockPerStorage);

  const stockPerStorage = await StockPerStorageRepository.findOne({
    where: {
      id,
    },
  });

  if (stockPerStorage === null) {
    throw new Error('Stock not found');
  }

  const updatedStock = await StockPerStorageRepository.save({
    ...stockPerStorage,
    quantity,
  });

  return updatedStock;
};

export const deleteStockPerStorageById = async (id: number): Promise<StockPerStorage> => {
  const StockPerStorageRepository = AppDataSource.getRepository(StockPerStorage);
  const stock = await StockPerStorageRepository.findOne({
    where: {
      id,
    },
  });
  if (stock === null) {
    throw new Error('Stock nor found');
  }
  return StockPerStorageRepository.remove(stock);
};
