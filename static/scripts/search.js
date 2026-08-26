document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    const resultsDiv = document.getElementById('search-results');
    if (!query) {
        resultsDiv.innerHTML = '<p>No search query provided.</p>';
        return;
    }
    resultsDiv.innerHTML = `<p>Searching for "<strong>${query}</strong>"...</p>`;

    // --- Local Site Search ---
    fetch('/static/content/site-index.json')
        .then(res => res.json())
        .then(pages => {
            const localResults = pages.filter(page =>
                page.title.toLowerCase().includes(query.toLowerCase()) ||
                page.content.toLowerCase().includes(query.toLowerCase())
            );
            let html = '';
            if (localResults.length > 0) {
                html += `<h2>Results from Ophelia Labs</h2>`;
                html += localResults.map(r =>
                    `<div class="search-result">
                        <a href="${r.url}"><h3>${r.title}</h3></a>
                        <p>${r.snippet}</p>
                    </div>`
                ).join('');
            } else {
                html += `<h2>Results from Ophelia Labs</h2><p>No results found on this site.</p>`;
            }
            resultsDiv.innerHTML = html + `<div id="external-results"><p>Searching linked sites...</p></div>`;

            // --- Federated Search: Google Programmable Search Engine ---
            // Replace with your own API key and CX
            const API_KEY = 'YOUR_API_KEY';
            const CX = 'YOUR_CX';
            fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    let extHtml = '';
                    if (data.items && data.items.length > 0) {
                        extHtml += `<h2>Results from Linked Sites</h2>`;
                        extHtml += data.items.map(item =>
                            `<div class="search-result">
                                <a href="${item.link}" target="_blank" rel="noopener">
                                    <h3>${item.title}</h3>
                                </a>
                                <p>${item.snippet}</p>
                                <span class="text-muted small">${item.displayLink}</span>
                            </div>`
                        ).join('');
                    } else {
                        extHtml += `<h2>Results from Linked Sites</h2><p>No results found on linked sites.</p>`;
                    }
                    document.getElementById('external-results').innerHTML = extHtml;
                })
                .catch(() => {
                    document.getElementById('external-results').innerHTML = `<h2>Results from Linked Sites</h2><p>Could not fetch external results.</p>`;
                });
        })
        .catch(() => {
            resultsDiv.innerHTML = `<p>Could not load local search index.</p>`;
        });
});