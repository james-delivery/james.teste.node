import Transfer from '../models/Transfer';
import TransferRepository from '../repositories/Transfers/TransferRepository';
import CompensationsRepository from '../repositories/Compensations/CompensationsRepository';
import UpdateCompensationDTO from '../repositories/Compensations/UpdateCompensationDTO';

class AfterTransferService {
  private transferRepository : TransferRepository;
  private compensationsRepository: CompensationsRepository;

  constructor(transferRepository: TransferRepository, compensationsRepository: CompensationsRepository){
    this.transferRepository = transferRepository;
    this.compensationsRepository = compensationsRepository;
  }

  public async execute(
    transferData: Transfer,
    { id, payment_date, status, update_at }: UpdateCompensationDTO,
  ) {
    try {
      if (Object.keys(transferData).length === 0) {
        throw new Error(`TER unexpected Error: ${transferData}`);
      }

  await this.compensationsRepository.updateCompensation({
        id,
        payment_date,
        status,
        update_at,
      });
  await this.transferRepository.create(transferData);
    } catch (error) {
      throw new Error(`Error occurred: ${error}`);
    }
  }
}

export default AfterTransferService;
