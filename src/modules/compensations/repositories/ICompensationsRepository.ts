import Compensation from '@modules/compensations/infra/typeorm/entities/Compensation';

export default interface ICompensationsRepository {
    findWaitingPaymentByInterval(): Promise<Compensation[] | undefined>;
    save(compensation: Compensation): Promise<Compensation>;
}
