const button = document.querySelector("#myButton");
const box = document.querySelector("#box");

button.addEventListener("click", event => {
  console.log("Button clicked");
  console.log(event.target);
});

box.addEventListener("click", event => {
  console.log("Div clicked");
});