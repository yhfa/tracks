export default async function fetcher<T>(
  url: string,
  body = undefined
): Promise<T> {
  const res = await fetch(`${window.location.origin}/api${url}`, {
    method: body ? 'POST' : 'GET',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { status, data } = await res.json();
  if (status === 'error') throw new Error(data.message);

  return data as T;
}
