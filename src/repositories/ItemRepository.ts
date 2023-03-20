import AppDataSource from '../config/dataSource';
import { InventoryType, Item } from '../models';

export const getAllItems = async (): Promise<Item[]> => {
  const ItemRepository = AppDataSource.getRepository(Item);

  return ItemRepository.find();
};

export const createItem = async (
  body: Pick<Item, 'description' | 'stock' | 'unitPrice' | 'status'> & {
    inventoryId: number;
  }
): Promise<Item> => {
  const { inventoryId, ...rest } = body;
  const ItemRepository = AppDataSource.getRepository(Item);
  const InventoryRepository = AppDataSource.getRepository(InventoryType);

  const inventoryType = await InventoryRepository.findOne({
    where: {
      id: body.inventoryId,
    },
  });

  if (inventoryType === null) {
    throw new Error('Inventory does not exist');
  }
  const item = {
    ...rest,
    inventoryType,
  };

  return ItemRepository.save(item);
};

export const getItemById = async (id: number): Promise<Item> => {
  const ItemRepository = AppDataSource.getRepository(Item);

  const item = await ItemRepository.findOne({
    where: {
      id,
    },
  });

  if (item === null) {
    throw new Error('Item not found');
  }
  return item;
};

export const putItemById = async (id: number, payload: Partial<Item>): Promise<Item> => {
  const ItemRepository = AppDataSource.getRepository(Item);

  const item = await ItemRepository.findOne({
    where: {
      id,
    },
    relations: {
      inventoryType: true,
    },
  });
  if (item === null) {
    throw new Error('Item not found');
  }
  item.status = payload?.status ?? item.status;
  item.description = payload?.description ?? item.description;

  return ItemRepository.save(item);
};

export const deleteItemById = async (id: number): Promise<Item> => {
  const ItemRepository = AppDataSource.getRepository(Item);
  const item = await ItemRepository.findOne({
    where: {
      id,
    },
  });
  if (item === null) {
    throw new Error('Item not found');
  }
  return ItemRepository.remove(item);
};
