import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('compensations')
class Compensation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() 
  recipient_id: string; 

  @Column() 
  order_id: string;

  @Column() 
  amount: number;

  @Column() 
  expected_payment_date: Date;

  @Column() 
  payment_date: Date;

  @Column() 
  status: 'waiting_payment' | 'paid';

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

 
}
export default Compensation;