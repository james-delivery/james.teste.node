import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transfers')
class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  amount: number;
  
  @Column()
  pagarme_transfer_id: string;
  
  @Column()
  reference_id: string;
  
  @Column()
  source_id: string;
  
  @Column()
  target_id: string;
  
  @Column()
  status: 'waiting_payment' | 'paid';
  
  @Column()
  funding_date: Date;
  
  @Column()
  funding_estimated_date: Date;
  
  @Column()
  date_created: Date;
  
  @Column()
  date_updated: Date;
  
  @Column()
  reference_type: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

 
}
export default Transfer;