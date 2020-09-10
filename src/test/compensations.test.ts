import { fetchDatabase } from "../database/connectionDatabase";

test("Teste consulta no banco de Compensations", async () => {
  const listCompensations = await fetchDatabase();
  let size = listCompensations.length;
  expect(size).toEqual(3);
});
