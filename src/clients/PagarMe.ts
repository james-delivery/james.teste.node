import * as HttpClient from '../util/request';
import config from 'config';
import { InternalError } from '../util/errors/internal-error';

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error when trying to communicate to PagarMe';
    super(`${internalMessage}: ${message}`);
  }
}

export class PagarMeResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error returned by the PagarMe service';
    super(`${internalMessage}: ${message}`);
  }
}

export class PagarMe {
  constructor(protected request = new HttpClient.Request()) {}

  public async createTransaction(compensation: any) {
    try {
      const pagarmeUrl = config.get('App.PagarMe.url');
      const apiKey = config.get('App.PagarMe.api_key');
      const response = await this.request.post<JSON>(
        `${pagarmeUrl}/transfers`,
        {
          api_key: apiKey,
          amount: compensation.compensation_amount,
          recipient_id: compensation.pagarme_recipient_id,
          metadata: {
            order_id: compensation.order_id,
            compensation_id: compensation.compensation_id,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': compensation.compensation_id,
          },
        }
      );

      return response;
    } catch (error) {
      if (HttpClient.Request.isRequestError(error)) {
        throw new PagarMeResponseError(
          `Error: ${JSON.stringify(error.response.data)} Code: ${
            error.response.status
          }`
        );
      }
      throw new ClientRequestError(error.message);
    }
  }

  public async getBalance() {
    try {
      const pagarmeUrl = config.get('App.PagarMe.url');
      const apiKey = config.get('App.PagarMe.api_key');
      const result = await this.request.get<JSON>(
        `${pagarmeUrl}/balance`,
        {
          headers: { 'Content-Type': 'application/json' },
          params: {
            api_key: apiKey,
          },
        }
      );
      return result;
    } catch (error) {
      if (HttpClient.Request.isRequestError(error)) {
        throw new PagarMeResponseError(
          `Error: ${JSON.stringify(error.response.data)} Code: ${
            error.response.status
          }`
        );
      }
      throw new ClientRequestError(error.message);
    }
  }
}
