import { getRepository, Repository, Between } from 'typeorm';
import Transfer from '@modules/compensations/infra/typeorm/entities/Transfer';
import ITransferRepository from '@modules/compensations/repositories/ITransfersRepository';
import ICreateTransferDTO from '@modules/compensations/dtos/ICreateTransferDTO';

class TransfersRepository implements ITransferRepository {
    private ormRepository: Repository<Transfer>;

    constructor() {
        this.ormRepository = getRepository(Transfer);
    }

    public async create(transferData: ICreateTransferDTO): Promise<Transfer> {
        const transfer = this.ormRepository.create(transferData);
        await this.ormRepository.save(transfer);
        return transfer;
    }
}

export default TransfersRepository;
