const unsecureFetch = async (
  url: string,
  { params, ...options }: { params?: any } & RequestInit,
  mock?: any,
): Promise<any> => {
  const queryString = params
    ? '?' + new URLSearchParams(params).toString()
    : '';

  if (mock) {
    return new Promise((res) => setTimeout(() => res(mock), 500));
  }
  // API kena CORS
  const response = await fetch(`${url}${queryString}`, {
    mode: 'cors',
    ...options,
  });

  // TODO: Add error handling and stuff

  return response.json();
};

export { unsecureFetch };
