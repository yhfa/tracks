export default function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
