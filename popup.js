document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const currentUrl = currentTab.url;

        if (currentUrl.trim().startsWith('https://aeon.co/essays/')) {
            fetch(`http://35.173.126.231:8000/reccomend_with_url/?url=${encodeURIComponent(currentUrl)}`)
            .then(response => response.json())
            .then(data => {
                if (!data || Object.keys(data).length === 0) {
                    gridContainer.innerHTML = '<p>No recommendations found.</p>';
                    return;
                }

                Object.values(data).forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    if (item.image) {
                        card.style.backgroundImage = `url(${item.image})`;
                        card.style.backgroundSize = 'cover'; // Ensures the image covers the card without distorting
                        card.style.backgroundPosition = 'center'; // Centers the image within the card
                    }

                    const cardContent = `
                    <a href="${item.url}" target="_blank" class="read-more-link">
                        <div class="card-content" onclick="window.open(item.url, '_blank')">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-description">${item.headline}</p>

                        </div>
                        </a>
                    `;

                    card.innerHTML = cardContent;

                    gridContainer.appendChild(card);
                });
            })
            .catch(err => {
                console.error('Error fetching recommendations:', err);
                gridContainer.innerHTML = '<p class="error">Error fetching recommendations.</p>';
            });
        } else {
            gridContainer.innerHTML = '<p class="error"> Not a valid Aeon esssay page.</p>';     
        }
    });
});
