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


// ================================
//  SUBMIT JOURNAL ENTRY
// ================================

// When "Submit" button in the form is clicked:
document.getElementById("submit-btn").addEventListener("click", async () => {

    // 1. Get values from input fields
    const name = document.getElementById("name").value;
    const note = document.getElementById("note").value;
    const rating = document.getElementById("rating").value;
    const date = document.getElementById("date").value;

    // 2. Simple validation
    if (!name || !note || !rating || !date) {
        alert("Please fill all fields");
        return;
    }

    try {
        // 3. Send data to backend API (POST request)
        const response = await fetch("http://localhost:3000/api/journals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                note,
                rating,
                date
            })
        });

        // 4. Convert backend JSON response
        const result = await response.json();

        console.log("Journal saved:", result);

        // 5. After saving → reload the list of journals
        loadJournals();

        // 6. Clear the form
        document.getElementById("name").value = "";
        document.getElementById("note").value = "";
        document.getElementById("rating").value = "";
        document.getElementById("date").value = "";

        // 7. Hide the journal form again
        document.getElementById("journalCard").style.display = "none";

    } catch (error) {
        console.error("Failed to submit journal:", error);
    }
});


