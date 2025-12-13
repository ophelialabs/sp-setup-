    // Initialize dropdowns
    const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    [...dropdownTriggerList].forEach(el => new bootstrap.Dropdown(el));

    // Initialize Bootstrap components
    function initializeBootstrapComponents(container = document) {
        // Initialize all Bootstrap components
        ['tooltip', 'popover', 'dropdown', 'modal', 'offcanvas'].forEach(type => {
            const elements = container.querySelectorAll(`[data-bs-toggle="${type}"]`);
            elements.forEach(el => new bootstrap[type.charAt(0).toUpperCase() + type.slice(1)](el));
        });}