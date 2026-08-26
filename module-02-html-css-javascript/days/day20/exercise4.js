async function getFirstTwoUsers() {
  try {
    // 1. Fetch the list
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    // 2. Get the first two users
    const firstTwo = users.slice(0, 2);

    // 3. Fetch details for both in parallel
    const details = await Promise.all(
      firstTwo.map(user =>
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
          })
      )
    );

    console.log(details);

  } catch (error) {
    console.error("Error:", error);
  }
}

getFirstTwoUsers();