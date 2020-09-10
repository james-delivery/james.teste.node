import { fetchDatabase } from "./database/connectionDatabase";
import { sendToPagarMe } from "./connections/pagarMe";

export const handler = async (event: any = {}): Promise<any> => {
  try {
    const listCompensation = await fetchDatabase();
    for (let compesation of listCompensation) {
      console.log(compesation);
      await sendToPagarMe(compesation);
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: "500",
    };
  }
  return {
    statusCode: "200",
    body: JSON.stringify({
      finished: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
