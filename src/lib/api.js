const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}