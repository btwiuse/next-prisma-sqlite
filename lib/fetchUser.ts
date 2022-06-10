export const fetchUser = async (
  method: string,
  data: {},
  url: string = "/api/users"
): Promise<{ response: Response; info: { message: string } }> => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
  });

  const info = await response.json();

  return { response, info };
};
