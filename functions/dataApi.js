import data from "./data.json";

const headers = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const handler = async () => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: headers,
  };

  return response;
};
