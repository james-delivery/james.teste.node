import { container } from 'tsyringe';

import IPaymentProvider from '@shared/container/providers/PaymentProvider/Models/IPaymentProvider';
import PaymentProviderPagarMe from '@shared/container/providers/PaymentProvider/Implementations/PaymentProviderPagarMe';

container.registerSingleton<IPaymentProvider>(
    'PaymentProviderPagarMe',
    PaymentProviderPagarMe
);
