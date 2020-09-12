import TransfersRepository from "../repositories/TransfersRepository";
import Transfers from '../entities/Transfers'
import CompensationRepository from "../repositories/CompensationRepository";


class AfterTransferService {
  public async execute (transferData: Transfers, compensationId: string){

    const terStatus = "paid";
    if (Object.keys(transferData).length === 0) {
        throw new Error(`TER unexpected Error: ${transferData}`);
    }
    const compensationRepository = new CompensationRepository();
    const transfersRepository = new TransfersRepository();
    await compensationRepository.update({
      id:compensationId,
      terStatus,
      time: new Date(),
    })

    await transfersRepository.insert(transferData);


  }
}
export default AfterTransferService;