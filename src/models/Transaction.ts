import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Item from './Item';

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  transactionType!: 'entry' | 'departure' | 'transfer' | 'adjustment';

  @OneToOne(() => Item)
  @JoinColumn()
  item!: Item;

  @Column()
  quantity!: number;

  @Column()
  cost!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
