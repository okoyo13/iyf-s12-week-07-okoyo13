import { loadState, saveState } from './storage.js';

// Load the saved application state
export const state = loadState();

// Observer Pattern - State subscribers
const listeners = [];

// Update and save application state
export function setState(updates) {
    Object.assign(state, updates);
    saveState(state);
    listeners.forEach((listener) => listener(state));
}

// Subscribe to state changes
export function subscribe(listener) {
    listeners.push(listener);

    // Return unsubscribe function
    return () => {
        const index = listeners.indexOf(listener);

        if (index !== -1) {
            listeners.splice(index, 1);
        }
    };
}
