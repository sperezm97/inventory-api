/* eslint-disable import/no-cycle */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Item from './Item';

@Entity()
export default class InventoryType {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    description!: string;

  @Column()
    account!: string;

  @Column()
    status!: boolean;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @OneToMany(() => Item, (item) => item.inventoryType)
    items!: Item[];
}
