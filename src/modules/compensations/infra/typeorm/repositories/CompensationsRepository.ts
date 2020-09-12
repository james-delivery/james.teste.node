import { getRepository, Repository, Between } from 'typeorm';
import Compensation from '@modules/compensations/infra/typeorm/entities/Compensation';
import ICompensationsRepository from '@modules/compensations/repositories/ICompensationsRepository';

class CompensationsRepository implements ICompensationsRepository {
    private ormRepository: Repository<Compensation>;

    constructor() {
        this.ormRepository = getRepository(Compensation);
    }

    public async findWaitingPaymentByInterval(): Promise<
        Compensation[] | undefined
    > {
        const startDate = new Date(new Date().setHours(0, 0, 0));
        const endDate = new Date(new Date().setHours(23, 59, 59));

        const findCompensations = await this.ormRepository.find({
            expected_payment_date: Between(startDate, endDate),
            status: 'waiting_payment',
        });

        return findCompensations;
    }

    public async save(compensation: Compensation): Promise<Compensation> {
        return this.ormRepository.save(compensation);
    }
}
export default CompensationsRepository;
