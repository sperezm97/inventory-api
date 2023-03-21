import {
 Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import StockPerStorage from './StockPerStorage';
import Transaction from './Transaction';

@Entity()
export default class Storage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  status!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => StockPerStorage, (stock) => stock.item)
  stockPerStorage!: StockPerStorage[];

  @OneToMany(() => Transaction, (stock) => stock.storage)
  transaction!: Transaction[];
}
