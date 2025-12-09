// ================================
//  SHOW / HIDE JOURNAL FORM CARD
// ================================
document.addEventListener('DOMContentLoaded', () => {       // This waits until the whole page (HTML) is loaded before running the code.
                                                            // Ensures elements like buttons and cards exist before you try to use them.
    const addBtn = document.getElementById('addJournalBtn');
    const card = document.getElementById('journalCard');

    addBtn.addEventListener('click', () => {
        const isHidden = card.style.display === 'none' || card.style.display === '';

        card.style.display = isHidden ? 'block' : 'none';
        addBtn.textContent = isHidden ? 'Hide Journal' : 'Add Journal';

        if (isHidden) {     // If the card is being shown, the page will scroll smoothly to the card so the user sees it.
            card.scrollIntoView({ behavior: 'smooth' });
        }
    });


// ================================
//  LOAD PREVIOUS JOURNALS
// ================================


    async function loadJournals() {
    const container = document.getElementById("prev-journals");
    

    try {
        const response = await fetch("http://localhost:3000/api/journals");
        const journals = await response.json(); // Server response to JS Objects.

        if (journals.length === 0) {
            container.innerHTML = "<p>No journal entries yet.</p>";
            return;
        }


        journals.forEach(journal => {
            const card =  `
                <div class="card">
                <h3>${journal.name}</h3>
                <p><strong>Note:</strong> ${journal.note}</p>
                <p><strong>Rating:</strong> ${journal.rating}</p>
                <p><strong>Date:</strong> ${journal.date}</p>
            `;
            
            container.innerHTML += card;
        });

    } catch (error) {
        container.innerHTML = "<p style='color:red;'>Failed to load journals.</p>";
        console.error(error);
    }
}

// Load journals automatically on page load
window.onload = loadJournals;

});

