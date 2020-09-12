import Transfer from '@modules/compensations/infra/typeorm/entities/Transfer';
import ICreateTransferDTO from '@modules/compensations/dtos/ICreateTransferDTO';

export default interface ITransfersRepository {
    create(data: ICreateTransferDTO): Promise<Transfer>;
}
