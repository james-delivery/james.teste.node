import CompensationsRepository from '../repositories/Compensations/CompensationsRepository';

describe('Compensations list test', () => {
  it('should return an array of compensations', async () => {
    let todayInit = new Date(new Date().setHours(0, 0, 0));
    let todayEnd = new Date(new Date().setHours(23, 59, 59));

    const compensationRepository = new CompensationsRepository();

    const response = await compensationRepository.all(todayInit, todayEnd);

    expect(response).toBeDefined();
  })
});
