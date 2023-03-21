import AppDataSource from '../config/dataSource';
import { Item, Transaction, Storage } from '../models';

export const getAllTransaction = async (): Promise<Transaction[]> => {
  const TransactionRepository = AppDataSource.getRepository(Transaction);

  return TransactionRepository.find();
};

export const createTransaction = async (
  body: Pick<Transaction, 'transactionType' | 'quantity'> & {
    itemId: number;
    storageId: number;
  }
): Promise<Transaction> => {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const { itemId, storageId, ...rest } = body;

  const ItemRepository = AppDataSource.getRepository(Item);

  const item = await ItemRepository.findOne({
    where: {
      id: itemId,
    },
  });

  if (item === null) {
    throw new Error('Item not found');
  }

  const StorageRepository = AppDataSource.getRepository(Storage);

  const storage = await StorageRepository.findOne({
    where: {
      id: storageId,
    },
  });

  if (storage === null) {
    throw new Error('Storage not found');
  }

  return TransactionRepository.save({
    ...rest,
    item,
    storage,
  });
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
  const TransactionRepository = AppDataSource.getRepository(Transaction);

  const transaction = await TransactionRepository.findOne({
    where: {
      id,
    },
  });

  if (transaction === null) {
    throw new Error('Transaction not founmd');
  }
  return transaction;
};

export const putTransactionById = async (
  id: number,
  payload: Partial<Transaction> & { itemId?: number }
): Promise<Transaction> => {
  const { itemId, ...rest } = payload;

  const TransactionRepository = AppDataSource.getRepository(Transaction);

  const transaction = await TransactionRepository.findOne({
    where: {
      id,
    },
  });

  if (transaction === null) {
    throw new Error('Transaction not found');
  }

  transaction.cost = rest.cost ?? transaction.cost;
  transaction.transactionType = rest.transactionType ?? transaction.transactionType;
  transaction.quantity = rest.quantity ?? transaction.quantity;

  return TransactionRepository.save(transaction);
};

export const deleteTransactionById = async (id: number): Promise<Transaction> => {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const transaction = await TransactionRepository.findOne({
    where: {
      id,
    },
  });
  if (transaction == null) {
    throw new Error('Transaction not found');
  }
  return TransactionRepository.remove(transaction);
};
