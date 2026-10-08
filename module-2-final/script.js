const state = {
  recipes: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  search: ""
};

const recipesContainer = document.getElementById("recipesContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const searchInput = document.getElementById("searchInput");
const statusMessage = document.getElementById("statusMessage");
const favCount = document.getElementById("favCount");

async function fetchRecipes() {
  statusMessage.textContent = "Loading recipes...";
  try {
    const res = await fetch("https://dummyjson.com/recipes");
    if (!res.ok) throw new Error("Failed to load recipes");
    const data = await res.json();
    state.recipes = data.recipes;
    statusMessage.textContent = "";
    render();
  } catch (err) {
    statusMessage.textContent = "Error: " + err.message;
  }
}

function createCard(recipe, isFav) {
  return `
    <div class="card">
      <img src="${recipe.image}" alt="${recipe.name}">
      <div class="card-body">
        <h3>${recipe.name}</h3>
        <p>Cuisine: ${recipe.cuisine}</p>
        <p>Difficulty: ${recipe.difficulty}</p>
        <p>Rating: ⭐ ${recipe.rating}</p>
        <p>ingredients:${recipe.ingredients.map(ing => `<span>${ing}</span>`).join(", ")}</p>
      

      </div>
    </div>
  `;
}


function render() {
  const filtered = state.recipes.filter(r =>
    r.name.toLowerCase().includes(state.search.toLowerCase())
  );

  if (state.recipes.length > 0 && filtered.length === 0) {
    statusMessage.textContent = `No recipes match "${state.search}"`;
  } else if (!statusMessage.textContent.startsWith("Error")) {
    statusMessage.textContent = "";
  }

  recipesContainer.innerHTML = filtered.map(recipe => {
    const isFav = state.favorites.some(f => f.id === recipe.id);
    return createCard(recipe, isFav);
  }).join("");

  favoritesContainer.innerHTML = state.favorites.length
    ? state.favorites.map(recipe => createCard(recipe, true)).join("")
    : "<p>No favorites added yet.</p>";

  favCount.textContent = state.favorites.length;
}

function toggleFavorite(id) {
  const index = state.favorites.findIndex(f => f.id === id);

  if (index !== -1) {
    state.favorites.splice(index, 1);
  } else {
    const recipe = state.recipes.find(r => r.id === id);
    if (recipe) state.favorites.push(recipe);
  }

  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  render();
}

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value.trim();
  render();
});

fetchRecipes();
