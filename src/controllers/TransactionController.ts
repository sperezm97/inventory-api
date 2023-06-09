import {
 Body, Delete, Get, Path, Post, Put, Route, Tags,
} from 'tsoa';
import { type Transaction } from '../models';
import {
  getAllTransaction,
  getTransactionById,
  deleteTransactionById,
  putTransactionById,
  createTransaction,
} from '../repositories/TransactionRepository';

@Route('transaction')
@Tags('Transaction')
export default class TransactionController {
  @Get('/')
  static async getAllTransactions(): Promise<Transaction[]> {
    return getAllTransaction();
  }

  @Post('/')
  static async createOneTransaction(
    @Body()
    body: Pick<Transaction, 'transactionType' | 'quantity'> & {
      itemId: number;
      storageId: number;
    }
  ): Promise<Transaction> {
    return createTransaction(body);
  }

  @Get('{id}')
  static async getOneTransaction(@Path() id: number): Promise<Transaction> {
    return getTransactionById(id);
  }

  @Put('{id}')
  static async updateOneTransaction(
    @Path() id: number,
    @Body()
    payload: Pick<Transaction, 'transactionType' | 'quantity'> & {
      itemId: number;
      storageId: number;
    }
  ): Promise<Transaction> {
    return putTransactionById(id, payload);
  }

  @Delete('{id}')
  static async removeOneTransaction(@Path() id: number): Promise<Transaction> {
    return deleteTransactionById(id);
  }
}
