async function getUsdToEtbRate() {
  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=USD&to=ETB"
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    return data.rates.ETB;

  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
  }
}