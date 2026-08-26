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

    // Initialize app
    async function initializeApp() {
        try {
            await Promise.all([
                loadContent('main/nav.html', 'nav-placeholder'),
                loadContent('main/main.html', 'main-content-placeholder'),
                loadContent('main/footer.html', 'footer-placeholder')
            ]);

    // Start the application
    initializeApp();
});


