import AppDataSource from '../config/dataSource';
import { Storage } from '../models';

export const getAllStorages = async (): Promise<Storage[]> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  return StorageRepository.find();
};

export const createStorage = async (body: Pick<Storage, 'description' | 'status'>): Promise<Storage> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  return StorageRepository.save(body);
};

export const getStorageById = async (id: number): Promise<Storage> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  const storage = await StorageRepository.findOne({
    where: {
      id,
    },
  });

  if (storage === null) {
    throw new Error('Storage not found');
  }

  return storage;
};

export const putStorageById = async (id: number, payload: Partial<Storage>): Promise<Storage> => {
  const StorageRepository = AppDataSource.getRepository(Storage);

  const storage = await StorageRepository.findOne({
    where: {
      id,
    },
  });
  if (storage === null) {
    throw new Error('Storage not found');
  }
  storage.status = payload?.status ?? storage.status;
  storage.description = payload?.description ?? storage.description;

  return StorageRepository.save(storage);
};

export const deleteStorageById = async (id: number): Promise<Storage> => {
  const StorageRepository = AppDataSource.getRepository(Storage);
  const storage = await StorageRepository.findOne({
    where: {
      id,
    },
  });
  if (storage === null) {
    throw new Error('Storage not found');
  }
  return StorageRepository.remove(storage);
};
