import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('compensations')
class Compensation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    recipient_id: string;

    @Column()
    amount: number;

    @Column()
    expected_payment_date: Date;

    @Column()
    payment_date: Date;

    @Column()
    status: string;
}

export default Compensation;
