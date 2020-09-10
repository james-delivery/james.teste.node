import * as handler from '../src/handler';

process.env.EXPECTED_PAYMENT_DATE = '2020/09/09';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn()
      // get list to process:
      .mockImplementationOnce(async ()=> {
        return {
          rows: []
        }
      })
      // update compensations:
      .mockImplementationOnce(async ()=> {
        return {
          rows: []
        }
      })
      // update transfer:
      .mockImplementationOnce(async ()=> {
        return {
          rows: []
        }
      }),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

test('processCompensations', async () => {
  const callback = function () {};

  const response = await handler.processCompensations(null, null, callback);

  expect(response.statusCode).toEqual(200);
  expect(typeof response.body).toBe("string");

  const responseData = JSON.parse(response.body);

  expect(responseData.finished).toEqual(true);
  expect(responseData.totalGotFromDB).toEqual(0);
  expect(responseData.totalProcessed).toEqual(0);
  expect(responseData.totalWithError).toEqual(0);
});
