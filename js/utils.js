// Format a date for display
export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

// Generate a unique ID
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Delay function execution until the specified time has passed
export function debounce(func, wait) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
