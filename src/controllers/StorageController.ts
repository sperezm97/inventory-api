import {
 Body, Delete, Get, Path, Post, Put, Route, Tags,
} from 'tsoa';
import { type Storage } from '../models';
import {
  getAllStorages,
  getStorageById,
  deleteStorageById,
  putStorageById,
  createStorage,
} from '../repositories/StorageRepository';

@Route('storage')
@Tags('Storage')
export default class StorageController {
  @Get('/')
  static async getAllStorages(): Promise<Storage[]> {
    return getAllStorages();
  }

  @Post('/')
  static async createOneStorage(@Body() body: Pick<Storage, 'description' | 'status'>): Promise<Storage | null> {
    return createStorage(body);
  }

  @Get('{id}')
  static async getOneStorage(@Path() id: number): Promise<Storage | null> {
    return getStorageById(id);
  }

  @Put('{id}')
  static async updateOneStorage(@Path() id: number, @Body() payload: Partial<Storage>): Promise<Storage | null> {
    return putStorageById(id, payload);
  }

  @Delete('{id}')
  static async removeOneStorage(@Path() id: number): Promise<Storage | null> {
    return deleteStorageById(id);
  }
}
