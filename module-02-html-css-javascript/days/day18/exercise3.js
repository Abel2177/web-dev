const customer = {
    name: "abel",
    city: "AA"
}
const {name, city} = customer

function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer); 
