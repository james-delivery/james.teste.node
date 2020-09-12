import { getRepository, Repository } from 'typeorm';
import Transfers from '../entities/Transfers';



class TransfersRepository {
  private ormRepository: Repository<Transfers>;

  constructor() {
    this.ormRepository  = getRepository(Transfers);
  }

  public async insert({
    id,
    amount, 
    pagarme_transfer_id, 
    reference_id, 
    source_id, 
    target_id, 
    status, 
    funding_date, 
    funding_estimated_date, 
    date_created, 
    date_updated, 
    reference_type,
  }:Transfers): Promise<void> {
    await this.ormRepository.createQueryBuilder().insert().into(Transfers).values({
      id,
      amount, 
      pagarme_transfer_id, 
      reference_id, 
      source_id, 
      target_id, 
      status, 
      funding_date, 
      funding_estimated_date, 
      date_created, 
      date_updated, 
      reference_type,
    }).execute();
  }
}

export default TransfersRepository;