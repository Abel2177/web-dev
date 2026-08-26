const form = document.querySelector("#searchForm");
const input = document.querySelector("#countryInput");
const out = document.querySelector("#facts");


async function showCountry(name) {

  // Loading state
  out.textContent = "Loading...";

  try {

    // Fetch country
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}`
    );

    // Check HTTP status
    if (!res.ok) {
      throw new Error("Country not found");
    }

    // Convert response to JavaScript
    const countries = await res.json();

    // Get the first country
    const country = countries[0];

    // Clear Loading...
    out.innerHTML = "";

    // Create flag
    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `${country.name.common} flag`;
    flag.classList.add("flag");

    out.append(flag);


    // Country name
    const title = document.createElement("h2");
    title.textContent = country.name.common;

    out.append(title);


    // Capital
    renderFact(
      out,
      "Capital",
      country.capital?.[0] || "N/A"
    );


    // Population
    renderFact(
      out,
      "Population",
      country.population.toLocaleString()
    );


    // Region
    renderFact(
      out,
      "Region",
      country.region
    );


    // Currency
    const currencyNames = Object.values(country.currencies || {})
      .map(currency => currency.name)
      .join(", ");

    renderFact(
      out,
      "Currency",
      currencyNames || "N/A"
    );


  } catch (error) {

    out.textContent = error.message;

    out.classList.add("error");
  }
}


// Create one fact row
function renderFact(parent, label, value) {

  const div = document.createElement("div");

  div.classList.add("fact");

  const strong = document.createElement("strong");

  strong.textContent = `${label}:`;

  const span = document.createElement("span");

  span.textContent = value;

  div.append(strong, span);

  parent.append(div);
}


// Search form
form.addEventListener("submit", event => {

  event.preventDefault();

  const countryName = input.value.trim();

  if (!countryName) {
    out.textContent = "Please enter a country name.";
    return;
  }

  showCountry(countryName);
});


// Default country
showCountry("ethiopia");