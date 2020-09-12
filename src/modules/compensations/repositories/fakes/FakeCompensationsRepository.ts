import { uuid } from 'uuidv4';
import Compensation from '@modules/compensations/infra/typeorm/entities/Compensation';
import ICompensationsRepository from '@modules/compensations/repositories/ICompensationsRepository';

class FakeCompensationsRepository implements ICompensationsRepository {
    private compensations: Compensation[] = [];

    public async findWaitingPaymentByInterval(): Promise<
        Compensation[] | undefined
    > {
        const startDate = new Date();
        const endDate = new Date();

        const findCompensations = this.compensations.filter((compensation) => {
            compensation.expected_payment_date >= startDate,
                compensation.expected_payment_date <= endDate,
                compensation.status === 'waiting_payment';
        });

        return findCompensations;
    }

    public async save(compensationData: Compensation): Promise<Compensation> {
        const findIndex = this.compensations.findIndex(
            (findCompensation) => findCompensation.id === compensationData.id
        );
        this.compensations[findIndex] = compensationData;
        return compensationData;
    }

    public async create(compensationData: Compensation): Promise<Compensation> {
        const compensation = new Compensation();
        Object.assign(compensation, compensationData);
        this.compensations.push(compensation);
        return compensation;
    }
}
export default FakeCompensationsRepository;
