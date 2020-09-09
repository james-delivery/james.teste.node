import * as handler from '../src/handler';

test('hello', async () => {
  function callback() {}

  const response = await handler.hello(null, null, callback);

  expect(response.statusCode).toEqual(200);
  expect(typeof response.body).toBe("string");
});