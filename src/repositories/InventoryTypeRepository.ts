import AppDataSource from '../config/dataSource';
import InventoryType from '../models/InventoryType';

export const getAllInventoryTypes = async (): Promise<InventoryType[]> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  return InventoryTypeRepository.find();
};

export const createInventoryType = async (
  body: Pick<InventoryType, 'description' | 'account' | 'status'>,
): Promise<InventoryType> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  return InventoryTypeRepository.save(body);
};

export const getInventoryTypeById = async (
  id: number,
): Promise<InventoryType | null> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  return InventoryTypeRepository.findOne({
    where: {
      id,
    },
  });
};

export const putInventoryTypeById = async (
  id: number,
  payload: Partial<InventoryType>,
): Promise<InventoryType | null> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);

  const inventory = await InventoryTypeRepository.findOne({
    where: {
      id,
    },
  });
  if (inventory == null) {
    return null;
  }
  inventory.account = payload?.account ?? inventory.account;
  inventory.description = payload?.description ?? inventory.description;

  return InventoryTypeRepository.save(inventory);
};

export const deleteInventoryTypeById = async (
  id: number,
): Promise<InventoryType | null> => {
  const InventoryTypeRepository = AppDataSource.getRepository(InventoryType);
  const inventory = await InventoryTypeRepository.findOne({
    where: {
      id,
    },
  });
  if (inventory == null) {
    return null;
  }
  return InventoryTypeRepository.remove(inventory);
};
