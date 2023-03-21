import { Get, Path, Route, Tags } from 'tsoa';
import { type StockPerStorage } from '../models';
import { getStockPerStorageById } from '../repositories/StockPerStorageRepository';

@Route('stock-per-storage')
@Tags('StockPerStorage')
export default class StockPerStorageController {
  @Get('{id}')
  static async getOneStockPerProduct(@Path() id: number): Promise<StockPerStorage> {
    return getStockPerStorageById(id);
  }
}
