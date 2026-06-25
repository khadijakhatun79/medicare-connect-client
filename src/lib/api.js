const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher(url, options = {}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    throw new Error(error);
  }

  return res.json();
}