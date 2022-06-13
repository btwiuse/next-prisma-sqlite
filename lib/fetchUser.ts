export const fetchUser = async (
  method: string,
  data: {},
  url: string = "/api/users"
): Promise<{ response: Response; info: { message: string } }> => {
  const headers = new Headers();
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });
  const info = await response.json();

  return { response, info };
};
