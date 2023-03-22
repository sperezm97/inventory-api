import AppDataSource from '../config/dataSource';
import { AppError, HttpCode } from '../helpers/HttpException';
import { InventoryType, Item } from '../models';

export const getAllItems = async (): Promise<Item[]> => {
  const ItemRepository = AppDataSource.getRepository(Item);
  try {
    return await ItemRepository.find();
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Internal Server Error',
    });
  }
};

export const createItem = async (
  body: Pick<Item, 'description' | 'unitPrice' | 'status'> & {
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
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: 'Inventory Not Found',
    });
  }
  const item = {
    ...rest,
    inventoryType,
    stock: 0,
  };

  try {
    return await ItemRepository.save(item);
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Internal Server Error',
    });
  }
};

export const getItemById = async (id: number): Promise<Item> => {
  const ItemRepository = AppDataSource.getRepository(Item);

  const item = await ItemRepository.findOne({
    where: {
      id,
    },
  });

  if (item === null) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: 'Item Not Found',
    });
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
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: 'Item Not Found',
    });
  }
  item.status = payload?.status ?? item.status;
  item.description = payload?.description ?? item.description;

  try {
    return await ItemRepository.save(item);
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Internal Server Error',
    });
  }
};

export const deleteItemById = async (id: number): Promise<Item> => {
  const ItemRepository = AppDataSource.getRepository(Item);
  const item = await ItemRepository.findOne({
    where: {
      id,
    },
  });
  if (item === null) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: 'Item Not Found',
    });
  }
  try {
    return await ItemRepository.remove(item);
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Internal Server Error',
    });
  }
};
