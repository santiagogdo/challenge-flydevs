import { config } from "../config";

export default async function fetchFromApi<T>(url: string): Promise<T> {
  const response = await fetch(new Request(url,
    {
      headers: {
        'Authorization': config.authToken || ''
      },
      method: 'GET',
    }));
  const parsedData = await response.json();
  return parsedData;
};