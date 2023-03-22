import AppDataSource from '../config/dataSource';
import { InventoryType } from '../models';

export const getAllInventoryTypes = async (): Promise<InventoryType[]> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  return InventoryTypeRepository.find();
};

export const createInventoryType = async (
  body: Pick<InventoryType, 'description' | 'account' | 'status'>
): Promise<InventoryType> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  return InventoryTypeRepository.save(body);
};

export const getInventoryTypeById = async (id: number): Promise<InventoryType | null> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  const inventoryType = await InventoryTypeRepository.findOne({
    where: {
      id,
    },
  });

  if (inventoryType === null) {
    throw new Error('InventoryType not found');
  }

  return inventoryType;
};

export const putInventoryTypeById = async (
  id: number,
  payload: Partial<InventoryType>
): Promise<InventoryType | null> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  const inventoryType = await InventoryTypeRepository.findOne({
    where: {
      id,
    },
  });
  if (inventoryType === null) {
    throw new Error('InventoryType not found');
  }
  inventoryType.account = payload?.account ?? inventoryType.account;
  inventoryType.description = payload?.description ?? inventoryType.description;

  return InventoryTypeRepository.save(inventoryType);
};

export const deleteInventoryTypeById = async (id: number): Promise<InventoryType | null> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);
  const inventoryType = await InventoryTypeRepository.findOne({
    where: {
      id,
    },
  });
  if (inventoryType == null) {
    throw new Error('InventoryType not found');
  }

  return InventoryTypeRepository.remove(inventoryType);
};
