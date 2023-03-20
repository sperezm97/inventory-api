import AppDataSource from '../config/dataSource';
import { Item } from '../models';
import Transaction from '../models/Transaction';

export const getAllTransaction = async (): Promise<Transaction[]> => {
  const TransactionRepository = AppDataSource.getRepository(Transaction);

  return TransactionRepository.find();
};

export const createTransaction = async (
  body: Pick<Transaction, 'transactionType' | 'quantity' | 'cost'> & {
    itemId: number;
  }
): Promise<Transaction> => {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const { itemId, ...rest } = body;

  const ItemRepository = AppDataSource.getRepository(Item);

  const item = await ItemRepository.findOne({
    where: {
      id: itemId,
    },
  });

  if (item === null) {
    throw new Error('Item not found');
  }

  return TransactionRepository.save({
    ...rest,
    item,
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
