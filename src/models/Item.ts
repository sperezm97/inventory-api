/* eslint-disable import/no-cycle */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import InventoryType from './InventoryType';
import StockPerStorage from './StockPerStorage';

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  stock!: number;

  @Column()
  unitPrice!: number;

  @Column()
  status!: boolean;

  @ManyToOne(() => InventoryType, (inventoryType) => inventoryType.items)
  inventoryType!: InventoryType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => StockPerStorage, (stock) => stock.item)
  stockPerStorage!: StockPerStorage[];
}
