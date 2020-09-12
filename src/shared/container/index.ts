import { container } from 'tsyringe';

import './providers';

import ICompensationsRepository from '@modules/compensations/repositories/ICompensationsRepository';
import CompensationsRepository from '@modules/compensations/infra/typeorm/repositories/CompensationsRepository';

import ITransferRepository from '@modules/compensations/repositories/ITransfersRepository';
import TransferRepository from '@modules/compensations/infra/typeorm/repositories/TransfersRespository';

container.registerSingleton<ICompensationsRepository>(
    'CompensationsRepository',
    CompensationsRepository
);

container.registerSingleton<ITransferRepository>(
    'TransferRepository',
    TransferRepository
);
