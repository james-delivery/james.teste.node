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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

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
    status: string;

    @Column('timestamp with time zone')
    funding_date: Date;

    @Column('timestamp with time zone')
    funding_estimated_date: Date;

    @Column('timestamp with time zone')
    date_created: Date;

    @Column('timestamp with time zone')
    date_updated: Date;

    @Column()
    reference_type: string;
}

export default Transfer;
