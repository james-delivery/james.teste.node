import FakeCompensationsRepository from '@modules/compensations/repositories/fakes/FakeCompensationsRepository';
import FakeTransfersRepository from '@modules/compensations/repositories/fakes/FakeTransfersRepository';
import CarryOutCompensationsService from '@modules/compensations/services/CarryOutCompensationsService';
import FakePaymentProvider from '@shared/container/providers/PaymentProvider/fakes/FakePaymentProvider';
import { uuid } from 'uuidv4';

let fakeCompensationsRepository: FakeCompensationsRepository;
let fakeTransfersRepository: FakeTransfersRepository;
let fakePaymentProvider: FakePaymentProvider;
let carryOutCompensationsService: CarryOutCompensationsService;

describe('CarryOutCompensations', () => {
    beforeEach(() => {
        fakeCompensationsRepository = new FakeCompensationsRepository();
        fakeTransfersRepository = new FakeTransfersRepository();
        fakePaymentProvider = new FakePaymentProvider();

        carryOutCompensationsService = new CarryOutCompensationsService(
            fakeCompensationsRepository,
            fakeTransfersRepository,
            fakePaymentProvider
        );
    });
    it('Should be able to carry out a new transaction through a compensation', async () => {
        const carryOutCompensations = jest.spyOn(
            fakePaymentProvider,
            'transfer'
        );
        await fakeCompensationsRepository.create({
            id: uuid(),
            recipient_id: 're_ckerwdkuf0gk9ce6epi8ao487',
            amount: 100,
            expected_payment_date: new Date(),
            payment_date: new Date(),
            status: 'waiting_payment',
        });

        await carryOutCompensationsService.execute();
        expect(carryOutCompensations).toHaveBeenCalled();
    });
});
