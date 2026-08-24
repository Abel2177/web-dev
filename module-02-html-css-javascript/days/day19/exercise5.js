const form = document.querySelector("#myForm");
const input = document.querySelector("#itemInput");
const outputList = document.querySelector("#outputList");

form.addEventListener("submit", event => {

  event.preventDefault();

  const value = input.value;

  const li = document.createElement("li");

  li.textContent = value;

  outputList.append(li);

  input.value = "";
});