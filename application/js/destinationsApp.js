async function loadDestinations(category = "") {
    try {
        const url = category 
            ? `http://localhost:3000/api/destinations?category=${category}`
            : `http://localhost:3000/api/destinations`;

        const response = await fetch(url);
        const data = await response.json();

        const container = document.getElementById('destinations');
        container.innerHTML = ""; 

        data.forEach(dest => {
            const card = `
                <div class="card">
                    <img src="${dest.picture}" alt="${dest.name}">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <div class="card-footer">
                        <span class="rating"> ${dest.rating}</span>
                        <button>Add to Journal</button>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

    } catch (err) {
        console.error("Failed to load destinations:", err);
    }
}

// load all on first load
loadDestinations();

// detect category change
document.getElementById("category").addEventListener("change", (e) => {
    loadDestinations(e.target.value);
});


// Load destinations on page load
loadDestinations();