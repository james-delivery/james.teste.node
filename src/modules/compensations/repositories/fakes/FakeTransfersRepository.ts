import { uuid } from 'uuidv4';
import Transfer from '@modules/compensations/infra/typeorm/entities/Transfer';
import ITransferRepository from '@modules/compensations/repositories/ITransfersRepository';
import ICreateTransferDTO from '@modules/compensations/dtos/ICreateTransferDTO';

class FakeTransfersRepository implements ITransferRepository {
    private transfers: Transfer[] = [];

    public async create(transferData: ICreateTransferDTO): Promise<Transfer> {
        const transfer = new Transfer();
        Object.assign(transfer, transferData);
        this.transfers.push(transfer);
        return transfer;
    }
}

export default FakeTransfersRepository;
