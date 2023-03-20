import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Item from './Item';
import Storage from './Storage';

@Entity()
export default class StockPerStorage {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Storage, (storage) => storage.stockPerStorage)
  @JoinTable()
  storage!: Storage;

  @ManyToOne(() => Item, (item) => item.stockPerStorage)
  @JoinTable()
  item!: Item;

  @Column()
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
