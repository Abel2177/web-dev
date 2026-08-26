async function testWrongUrl() {
  try {
    const res = await fetch("https://this-url-does-not-exist-12345.com");

    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log("Catch ran!");
    console.log(error);
  }
}

testWrongUrl();

async function test404() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users/999999"
    );

    console.log("Request finished");
    console.log("Status:", res.status);
    console.log("OK:", res.ok);

    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log("Catch ran!");
    console.log(error);
  }
}

test404();