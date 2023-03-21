import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Item from './Item';
import Storage from './Storage';

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  transactionType!: 'entry' | 'departure' | 'transfer' | 'adjustment';

  @Column()
  quantity!: number;

  @Column()
  cost!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Storage, (storage) => storage.transaction)
  @JoinColumn()
  storage!: Storage;

  @ManyToOne(() => Item, (item) => item.transactionPerItem)
  @JoinColumn()
  item!: Item;
}
