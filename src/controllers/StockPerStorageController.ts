import {
 Body, Delete, Get, Path, Post, Put, Route, Tags,
} from 'tsoa';
import { type StockPerStorage } from '../models';
import {
  createStockPerStorage,
  getStockPerStorageById,
  putStockPerStorageById,
  deleteStockPerStorageById,
} from '../repositories/StockPerStorageRepository';

@Route('stock-per-storage')
@Tags('StockPerStorage')
export default class StockPerStorageController {
  @Post('/')
  static async createOneStockInStorage(
    @Body()
    body: Pick<StockPerStorage, 'quantity'> & {
      itemId: number;
      storageId: number;
    }
  ): Promise<StockPerStorage | null> {
    return createStockPerStorage(body);
  }

  @Get('{id}')
  static async getOneStockPerProduct(@Path() id: number): Promise<StockPerStorage> {
    return getStockPerStorageById(id);
  }

  @Put('{id}')
  static async updateOneStockInStorage(
    @Path() id: number,
    @Body()
    body: Pick<StockPerStorage, 'quantity'>
  ): Promise<StockPerStorage | null> {
    return putStockPerStorageById(id, body);
  }

  @Delete('{id}')
  static async removeOneStockInStorage(@Path() id: number): Promise<StockPerStorage> {
    return deleteStockPerStorageById(id);
  }
}
