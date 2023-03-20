import {
 Body, Delete, Get, Path, Post, Put, Route, Tags,
} from 'tsoa';
import { type Item } from '../models';
import { getAllItems, getItemById, deleteItemById, putItemById, createItem } from '../repositories/ItemRepository';

@Route('item')
@Tags('Item')
export default class ItemController {
  @Get('/')
  static async getAllItems(): Promise<Item[]> {
    return getAllItems();
  }

  @Post('/')
  static async createOneItem(
    @Body()
    body: Pick<Item, 'description' | 'stock' | 'unitPrice' | 'status'> & {
      inventoryId: number;
    }
  ): Promise<Item | null> {
    return createItem(body);
  }

  @Get('{id}')
  static async getOneItem(@Path() id: number): Promise<Item | null> {
    return getItemById(id);
  }

  @Put('{id}')
  static async updateOneItem(@Path() id: number, @Body() payload: Partial<Item>): Promise<Item | null> {
    return putItemById(id, payload);
  }

  @Delete('{id}')
  static async removeOneItem(@Path() id: number): Promise<Item | null> {
    return deleteItemById(id);
  }
}
