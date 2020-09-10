import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Compensations {
  @PrimaryColumn()
  id: number;
  @Column({name:'id'})
  recipient_id: String;
  @Column()
  amount: number;
  @Column()
  expected_payment_date: Date;
  @Column()
  status: String;
  @Column()
  order_id: String;
  
  payment_date: Date;
  created_at: Date;
  updated_at: Date;
}
