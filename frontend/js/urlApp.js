// Fetch all images from backend when page loads
async function loadAllImages() {
    try {
        // Single API call to get all settings
        const response = await fetch('http://localhost:3000/api/settings');
        const data = await response.json();
        
        // Load logo
        if (data.logoUrl) {
            const navbar = document.getElementById('navbar');
            navbar.innerHTML = `
                <img src="${data.logoUrl}" 
                     alt="Logo" 
                     style="width:32px; height:32px; margin-right:10px;">
            `;
        }

        // Load beach image
        if (data.beach) {
            const beachElement = document.getElementById('beach-pic');
            if (beachElement) {
                beachElement.src = data.beach;
            }
        }

        // Load forest image  
        if (data.forest) {
            const forestElement = document.getElementById('forest-pic');
            if (forestElement) {
                forestElement.src = data.forest;
            }
        }

        // Load river image
        if (data.river) {
            const riverElement = document.getElementById('river-pic');
            if (riverElement) {
                riverElement.src = data.river;
            }
        }

    } catch (error) {
        // Single error handling for all images
        console.error('Error loading images:', error);
    }
}

// Load all images when page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);