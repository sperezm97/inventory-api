import {
 Body, Delete, Get, Path, Post, Put, Route, Tags,
} from 'tsoa';
import { type InventoryType } from '../models';
import {
  getAllInventoryTypes,
  getInventoryTypeById,
  deleteInventoryTypeById,
  putInventoryTypeById,
  createInventoryType,
} from '../repositories/InventoryTypeRepository';

@Route('inventory-type')
@Tags('InventoryType')
export default class InventoryTypeController {
  @Get('/')
  static async getAllInventoryTypes(): Promise<InventoryType[]> {
    return getAllInventoryTypes();
  }

  @Post('/')
  static async createOneInventoryType(
    @Body() body: Pick<InventoryType, 'description' | 'account' | 'status'>
  ): Promise<InventoryType | null> {
    return createInventoryType(body);
  }

  @Get('{id}')
  static async getOneInventoryType(@Path() id: number): Promise<InventoryType | null> {
    return getInventoryTypeById(id);
  }

  @Put('{id}')
  static async updateOneInventoryType(
    @Path() id: number,
    @Body() payload: Partial<InventoryType>
  ): Promise<InventoryType | null> {
    return putInventoryTypeById(id, payload);
  }

  @Delete('{id}')
  static async removeOneInventoryType(@Path() id: number): Promise<InventoryType | null> {
    return deleteInventoryTypeById(id);
  }
}
