export async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    try {
      error.info = await res.json();
    } catch {
      error.info = await res.text();
    }
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export default fetcher;
