import data from "./data.json";

export const handler = async () => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };

  return response;
};
