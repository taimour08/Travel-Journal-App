document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addJournalBtn');
    const card = document.getElementById('journalCard');

   addBtn.addEventListener('click', () => {
    if (card.style.display === 'none' || card.style.display === '') {
        card.style.display = 'block';         // Show the card
        addBtn.textContent = 'Hide Journal';   // Change button text
    } else {
        card.style.display = 'none';          // Hide the card
        addBtn.textContent = 'Add Journal';   // Reset button text
    }
        card.scrollIntoView({ behavior: 'smooth' }); // Optional: scroll to card
    });
});
