import { getRepository, Raw, Repository } from 'typeorm';
import Compensation from '../entities/Compensation';

interface UpdateCompensation {
  time: Date;
  id: string;
  terStatus: 'waiting_payment' | 'paid';
}

class CompensationRepository {
  private ormRepository: Repository<Compensation>;

  constructor() {
    this.ormRepository  = getRepository(Compensation);
  }

  public async fetchDatabase(): Promise<Compensation[]> {



    let todayInit = new Date(new Date().setHours(0, 0, 0));
    let todayEnd = new Date(new Date().setHours(23, 59, 59));
    if (todayEnd.getDay() == 2) {
        todayEnd.setDate(todayEnd.getDate() + 1);
    }





    const res = await this.ormRepository.find(
      { 
        where: {
          amount: Raw('amount > 0'),
          status: 'waiting_payment',
          expected_payment_date: Raw(`
            expected_payment_date - interval '3 hours' >= ${todayInit} AND 
            expected_payment_date - interval '3 hours' <= ${todayEnd}
          `),
        
        }, 
        order: {
          id:"ASC"
        },
        take: 70
        
    });
    return res;
  }

  public async update({ id, time, terStatus }:UpdateCompensation){
    const findedElement = await this.ormRepository.findOne(id);

    if(!findedElement){
      throw new Error('Element doesn`t Find')
    }

    const updatedElement = {
      ...findedElement,
      payment_date: time,
      status: terStatus
    }

    await this.ormRepository.save(updatedElement)
  }
}

export default CompensationRepository;