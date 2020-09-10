import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Transfers {
  @PrimaryColumn()
  id: number;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
  @Column()
  amount: number;
  @Column()
  order_id: String;
  @Column()
  pagarme_transfer_id: String;
  @Column()
  reference_id: String;
  @Column()
  source_id: String;
  @Column()
  target_id: String;
  @Column()
  status: String;
  @Column()
  funding_date: Date;
  @Column()
  funding_estimated_date: Date;
  @Column()
  date_created: Date;
  @Column()
  date_updated: Date;
  @Column()
  reference_type: String;
}
