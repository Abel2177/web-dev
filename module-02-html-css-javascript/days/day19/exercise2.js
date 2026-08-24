const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];


const cityList = document.querySelector("#cityList");

cities.forEach(city => {
  const li = document.createElement("li");

  li.textContent = city;

  cityList.append(li);
});