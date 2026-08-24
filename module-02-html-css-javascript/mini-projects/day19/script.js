const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");
const errorEl = document.querySelector("#error");


// Add an item to the list
function addRow(name, price) {

  const li = document.createElement("li");

  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item-info");

  const itemName = document.createElement("span");
  itemName.textContent = name;

  const itemPrice = document.createElement("span");
  itemPrice.textContent = `${price} ETB`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");

  itemInfo.append(itemName, itemPrice);

  li.append(itemInfo, deleteButton);

  list.append(li);
}


// Calculate total
function updateTotal() {

  const items = list.querySelectorAll("li");

  let total = 0;

  items.forEach(item => {

    const priceText = item
      .querySelector(".item-info span:nth-child(2)")
      .textContent;

    const price = Number(
      priceText.replace(" ETB", "")
    );

    total += price;
  });

  totalEl.textContent = total;
}


// Form submission
form.addEventListener("submit", event => {

  event.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  // Validation
  if (!name || price <= 0) {
    errorEl.textContent = "Please enter an item name and a valid price.";
    return;
  }

  errorEl.textContent = "";

  addRow(name, price);

  form.reset();

  updateTotal();
});


// Event delegation
list.addEventListener("click", event => {

  // Delete item
  if (event.target.matches(".delete-btn")) {

    event.target.closest("li").remove();

    updateTotal();
  }


  // Toggle bought state
  else if (event.target.closest("li")) {

    const li = event.target.closest("li");

    li.classList.toggle("bought");
  }

});