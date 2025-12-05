async function loadDestinations() {
    try {
        const response = await fetch('http://localhost:3000/api/destinations');
        const data = await response.json();

        const container = document.getElementById('destinations');
        container.innerHTML = ""; // Clear old content

        data.forEach(dest => {
            const card = `
                <div class="card">
                    <img src="${dest.picture}" alt="${dest.name}">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <div class="card-footer">
                        <span class="rating">⭐ ${dest.rating}</span>
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

// Load destinations on page load
loadDestinations();