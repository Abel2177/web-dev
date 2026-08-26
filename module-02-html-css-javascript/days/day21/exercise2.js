

function save(key, array) {

    localStorage.setItem(
        key,
        JSON.stringify(array)
    );
}

function load(key) {

    try {

        const data = localStorage.getItem(key);

        // Nothing stored
        if (data === null) {
            return [];
        }

        // Convert JSON string back to array
        return JSON.parse(data);

    } catch (error) {

        console.log("Could not load data:", error);

        return [];
    }
}

const employees = [
    {
        name: "Abel",
        salary: 10000
    },
    {
        name: "John",
        salary: 12000
    }
];


// Save
save("employees", employees);


// Load
const loadedEmployees = load("employees");

console.log(loadedEmployees);