// static/scripts/site.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));

    // Load nav
    fetch('main/nav.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('nav-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});

    // Load main
    fetch('main/main.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('main-content-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});

    // Load footer
    fetch('main/footer.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const footer = document.getElementById('footer-placeholder');
            if (footer) footer.innerHTML = data;
        })
        .catch(() => {});
    ('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));

    // Initialize popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].forEach(el => new bootstrap.Popover(el));

    // Initialize modals
    const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]');
    [...modalTriggerList].forEach(el => new bootstrap.Modal(el));

    // Initialize dropdowns
    const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    [...dropdownTriggerList].forEach(el => new bootstrap.Dropdown(el));

    // Initialize sidebars (offcanvas)
    const sidebarTriggerList = document.querySelectorAll('[data-bs-toggle="offcanvas"]');
    [...sidebarTriggerList].forEach(el => new bootstrap.Offcanvas(el));

    // Initialize carousels
    const carouselTriggerList = document.querySelectorAll('.carousel');
    [...carouselTriggerList].forEach(el => new bootstrap.Carousel(el));

    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Sanitize HTML (basic)
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Highlight search terms
    function highlightTerm(text, term) {
        if (!term) return text;
        const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${safeTerm})`, 'gi'), '<mark>$1</mark>');
    }

    // Initialize Bootstrap components after content load
    function initializeBootstrapComponents() {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(el => new bootstrap.Tooltip(el));

        const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
        popovers.forEach(el => new bootstrap.Popover(el));

        const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        dropdowns.forEach(el => new bootstrap.Dropdown(el));
    }

    // Handle navigation clicks
    document.addEventListener('click', function(e) {
        // Check if the clicked element is a link within our site
        const link = e.target.closest('a');
        if (link && 
            link.href && 
            link.href.startsWith(window.location.origin) && 
            !link.hasAttribute('data-no-dynamic') && 
            !link.getAttribute('target')) {
            
            e.preventDefault();
            const url = link.href;
            
            // Update URL without reload
            window.history.pushState({}, '', url);
            
            // Load the content
            loadContent(url);
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        loadContent(window.location.href);
    });

    // Load page components
    Promise.all([
        fetch('main/nav.html').then(res => res.ok ? res.text() : Promise.reject(res)),
        fetch('main/welcome.html').then(res => res.ok ? res.text() : Promise.reject(res)),
        fetch('main/footer.html').then(res => res.ok ? res.text() : Promise.reject(res))
    ])
    .then(([navContent, headContent, footerContent]) => {
        // Insert the content
        const navPlaceholder = document.getElementById('nav-placeholder');
        const headPlaceholder = document.getElementById('head-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (navPlaceholder) navPlaceholder.innerHTML = navContent;
        if (headPlaceholder) headPlaceholder.innerHTML = headContent;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerContent;

        // Initialize search after components are loaded
        initializeSearch();
    })
    .catch(error => {
        console.error('Error loading page components:', error);
    });
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                // Accessibility
                searchInput.setAttribute('aria-label', 'Site search');
                searchInput.setAttribute('autocomplete', 'off');

                // Mobile-friendly styling (optional, can also be done in CSS)
                searchInput.classList.add('w-100', 'mb-2');

                // Loading indicator
                let loadingIndicator = null;

                // Instant search suggestions
                const suggestionBox = document.createElement('div');
                suggestionBox.className = 'list-group position-absolute w-100 shadow';
                suggestionBox.style.zIndex = 1000;
                suggestionBox.style.display = 'none';
                searchInput.parentNode.appendChild(suggestionBox);

                function showSuggestions(results, query) {
                    suggestionBox.innerHTML = '';
                    if (results.length === 0) {
                        suggestionBox.style.display = 'none';
                        return;
                    }
                    results.slice(0, 5).forEach(r => {
                        const item = document.createElement('button');
                        item.type = 'button';
                        item.className = 'list-group-item list-group-item-action';
                        item.innerHTML = highlightTerm(sanitizeHTML(r.title), query);
                        item.onclick = () => window.location.href = r.url;
                        suggestionBox.appendChild(item);
                    });
                    suggestionBox.style.display = 'block';
                }

                function hideSuggestions() {
                    suggestionBox.style.display = 'none';
                }

                // Debounced instant search
                searchInput.addEventListener('input', debounce(function(e) {
                    const query = this.value.trim();
                    if (!query) {
                        hideSuggestions();
                        return;
                    }
                    // Show loading indicator
                    if (!loadingIndicator) {
                        loadingIndicator = document.createElement('div');
                        loadingIndicator.className = 'spinner-border spinner-border-sm ms-2';
                        loadingIndicator.setAttribute('role', 'status');
                        loadingIndicator.setAttribute('aria-hidden', 'true');
                        this.parentNode.appendChild(loadingIndicator);
                    }
                    loadingIndicator.style.display = 'inline-block';

                    fetch('site-index.json')
                        .then(res => res.json())
                        .then(pages => {
                            const results = pages.filter(page =>
                                page.title.toLowerCase().includes(query.toLowerCase()) ||
                                page.content.toLowerCase().includes(query.toLowerCase())
                            );
                            showSuggestions(results, query);
                        })
                        .catch(() => hideSuggestions())
                        .finally(() => {
                            if (loadingIndicator) loadingIndicator.style.display = 'none';
                        });
                }, 300));

                // Hide suggestions on blur
                searchInput.addEventListener('blur', () => setTimeout(hideSuggestions, 200));

                // Enter key triggers redirect to search.html
                searchInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const query = encodeURIComponent(this.value.trim());
                        if (query) {
                            window.location.href = `main/search.html?q=${query}`;
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error initializing search:', error);
        });

document.addEventListener('DOMContentLoaded', function() {
    // Cache for loaded content
    const contentCache = new Map();

    // Initialize Bootstrap components
    function initializeBootstrapComponents(container = document) {
        // Initialize all Bootstrap components
        ['tooltip', 'popover', 'dropdown', 'modal', 'offcanvas'].forEach(type => {
            const elements = container.querySelectorAll(`[data-bs-toggle="${type}"]`);
            elements.forEach(el => new bootstrap[type.charAt(0).toUpperCase() + type.slice(1)](el));
        });

        // Initialize carousels
        container.querySelectorAll('.carousel').forEach(el => new bootstrap.Carousel(el));
    }

    // Load and cache content
    async function loadContent(url, targetId) {
        try {
            let content;
            const adjustedUrl = url.startsWith('/') ? url : getRelativePath() + url;

            if (contentCache.has(adjustedUrl)) {
                content = contentCache.get(adjustedUrl);
            } else {
                const response = await fetch(adjustedUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                content = await response.text();
                contentCache.set(adjustedUrl, content);
            }

            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = content;
                initializeBootstrapComponents(target);
                updateActiveStates(adjustedUrl);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    // Get relative path based on current URL depth
    function getRelativePath() {
        const pathDepth = window.location.pathname.split('/').length - 1;
        return pathDepth > 2 ? '../'.repeat(pathDepth - 2) : '';
    }

    // Update active states in navigation
    function updateActiveStates(url) {
        document.querySelectorAll('.nav-link.active, .dropdown-item.active').forEach(el => 
            el.classList.remove('active')
        );

        document.querySelectorAll('a').forEach(link => {
            if (link.href === url || link.href === window.location.href) {
                link.classList.add('active');
                const dropdownParent = link.closest('.dropdown');
                if (dropdownParent) {
                    dropdownParent.querySelector('.nav-link').classList.add('active');
                }
            }
        });
    }

    // Handle navigation clicks
    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && 
            link.href && 
            link.href.startsWith(window.location.origin) && 
            !link.hasAttribute('data-no-dynamic') && 
            !link.getAttribute('target')) {
            
            e.preventDefault();
            const url = new URL(link.href);
            const relativePath = url.pathname;
            
            window.history.pushState({url: relativePath}, '', url);
            loadContent(relativePath, 'main-content-placeholder');
        }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', e => {
        if (e.state?.url) {
            loadContent(e.state.url, 'main-content-placeholder');
        }
    });

    // Initialize app
    async function initializeApp() {
        try {
            await Promise.all([
                loadContent('main/nav.html', 'nav-placeholder'),
                loadContent('main/main.html', 'main-content-placeholder'),
                loadContent('main/footer.html', 'footer-placeholder')
            ]);

            // Update year in footer
            const yearEl = document.getElementById('year');
            if (yearEl) {
                yearEl.textContent = new Date().getFullYear();
            }

            // Set initial active states
            updateActiveStates(window.location.href);
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    // Start the application
    initializeApp();
});


