// Fetch logo from backend when page loads
async function loadLogo() {
    try {
        // Make API call to get logo URL from backend server
        const response = await fetch('http://localhost:3000/api/logo');
        const data = await response.json();
        
        // Get navbar element and insert logo image
        const navbar = document.getElementById('navbar');
        if (data.logoUrl) {
            navbar.innerHTML = `
                <img src="${data.logoUrl}" 
                     alt="Logo" 
                     style="width:32px; height:32px; margin-right:10px;">
            `;
        } else {
            console.error('No logo URL found in database');
        }
    } catch (error) {
        // If API call fails, log error
        console.error('Error loading logo:', error);
    }
}

// Load logo when page is ready (after DOM is fully loaded)
document.addEventListener('DOMContentLoaded', loadLogo);