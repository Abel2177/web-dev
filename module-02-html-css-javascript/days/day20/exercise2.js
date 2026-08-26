fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => render(data))
  .catch(error => console.error(error));

  async function getUsers() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    const data = await res.json();

    render(data);

  } catch (error) {
    console.error("Error:", error);
  }
}

getUsers();