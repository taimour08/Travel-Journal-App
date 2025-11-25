// Get the button from HTML by its ID
const button = document.getElementById('showGamersBtn');

// Get the container where all gamer data will appear
const container = document.getElementById('data-container');

// When the button is clicked, run this function
button.addEventListener('click', async function() {

    // Show message in console to confirm button works
    console.log('Button clicked!');

    // Inform user that data is loading
    container.innerHTML = "<p>Loading gamers...</p>";

    try {
        // Fetch data from backend (GET request)
        const response = await fetch("http://localhost:3000/api/gamers");

        // Convert API response into JSON
        const gamers = await response.json();

        // Start building HTML to display gamers
        let html = "<h3>Gamers List</h3>";

        // If no gamers found
        if (gamers.length === 0) {
            container.innerHTML = "<p>No gamers found.</p>";
            return;
        }

        // Loop through all gamer entries
        gamers.forEach(gamer => {
            html += `
                <div style="
                    margin-bottom: 10px; 
                    padding: 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 5px;
                ">
                    <p><strong>Name:</strong> ${gamer.name}</p>
                    <p><strong>Age:</strong> ${gamer.age}</p>
                    <p><strong>Game:</strong> ${gamer.game}</p>
                </div>
            `;
        });

        // Insert the final HTML into the container
        container.innerHTML = html;

    } catch (error) {
        // If backend is off or error happens
        container.innerHTML = "<p style='color:red;'>Error fetching gamers.</p>";
        console.error(error);
    }
});
// Get the button from HTML by its ID
const button = document.getElementById('showGamersBtn');

// Get the container where all gamer data will appear
const container = document.getElementById('data-container');

// When the button is clicked, run this function
button.addEventListener('click', async function() {

    // Show message in console to confirm button works
    console.log('Button clicked!');

    // Inform user that data is loading
    container.innerHTML = "<p>Loading gamers...</p>";

    try {
        // Fetch data from backend (GET request)
        const response = await fetch("http://localhost:3000/api/gamers");

        // Convert API response into JSON
        const gamers = await response.json();

        // Start building HTML to display gamers
        let html = "<h3>Gamers List</h3>";

        // If no gamers found
        if (gamers.length === 0) {
            container.innerHTML = "<p>No gamers found.</p>";
            return;
        }

        // Loop through all gamer entries
        gamers.forEach(gamer => {
            html += `
                <div style="
                    margin-bottom: 10px; 
                    padding: 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 5px;
                ">
                    <p><strong>Name:</strong> ${gamer.name}</p>
                    <p><strong>Age:</strong> ${gamer.age}</p>
                    <p><strong>Game:</strong> ${gamer.game}</p>
                </div>
            `;
        });

        // Insert the final HTML into the container
        container.innerHTML = html;

    } catch (error) {
        // If backend is off or error happens
        container.innerHTML = "<p style='color:red;'>Error fetching gamers.</p>";
        console.error(error);
    }
});
