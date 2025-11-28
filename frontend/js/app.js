document.addEventListener('DOMContentLoaded', function() {
    const showBtn = document.getElementById('showGamersBtn');
    const container = document.getElementById('data-container');
    
    showBtn.addEventListener('click', fetchGamers);
    
    async function fetchGamers() {
        try {
            const response = await fetch('http://localhost:3000/api/gamers');
            const gamers = await response.json();
            
            container.innerHTML = '<h2>Gamers:</h2>';
            gamers.forEach(gamer => {
                container.innerHTML += `
                    <div class="gamer-card">
                        <h3>${gamer.name}</h3>
                        <p>Age: ${gamer.age}</p>
                        <p>Game: ${gamer.game}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error:', error);
            container.innerHTML = 'Error loading data';
        }
    }
});