const itemList = document.querySelector("#itemList");

itemList.addEventListener("click", event => {

  if (event.target.classList.contains("delete-btn")) {

    event.target.parentElement.remove();

  }

});