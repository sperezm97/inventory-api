import AppDataSource from '../config/dataSource';
import { Storage } from '../models';

export const getAllStorages = async (): Promise<Storage[]> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  return StorageRepository.find();
};

export const createStorage = async (
  body: Pick<Storage, 'description' | 'status'>,
): Promise<Storage> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  return StorageRepository.save(body);
};

export const getStorageById = async (id: number): Promise<Storage | null> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  return StorageRepository.findOne({
    where: {
      id,
    },
  });
};

export const putStorageById = async (
  id: number,
  payload: Partial<Storage>,
): Promise<Storage | null> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  const storage = await StorageRepository.findOne({
    where: {
      id,
    },
  });
  if (storage == null) {
    return null;
  }
  storage.status = payload?.status ?? storage.status;
  storage.description = payload?.description ?? storage.description;

  return StorageRepository.save(storage);
};

export const deleteStorageById = async (
  id: number,
): Promise<Storage | null> => {
  const StorageRepository = AppDataSource.getRepository(Storage);
  const storage = await StorageRepository.findOne({
    where: {
      id,
    },
  });
  if (storage == null) {
    return null;
  }
  return StorageRepository.remove(storage);
};
