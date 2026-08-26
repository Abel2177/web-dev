const statusEl = document.querySelector("#status");
const userList = document.querySelector("#userList");

async function getUsers() {

  // 1. LOADING STATE
  statusEl.textContent = "Loading...";
  userList.innerHTML = "";

  try {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    // Check HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    // 2. SUCCESS STATE
    statusEl.textContent = "Users loaded successfully.";

    users.forEach(user => {

      const li = document.createElement("li");

      li.textContent = user.name;

      userList.append(li);

    });

  } catch (error) {

    // 3. ERROR STATE
    statusEl.textContent = `Error: ${error.message}`;

  }
}

getUsers();