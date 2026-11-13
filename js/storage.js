const STORAGE_KEY = 'appState';

// Save application state to localStorage
export function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Unable to save application state:', error);
    }
}

// Load application state from localStorage
export function loadState() {
    const defaultState = {
        todos: [],
        filter: 'all',
        theme: 'light',
    };

    try {
        const savedState = localStorage.getItem(STORAGE_KEY);

        if (!savedState) {
            return defaultState;
        }

        const parsedState = JSON.parse(savedState);

        if (
            !parsedState ||
            typeof parsedState !== 'object' ||
            !Array.isArray(parsedState.todos)
        ) {
            return defaultState;
        }

        return {
            todos: parsedState.todos.filter(
                (todo) =>
                    todo &&
                    typeof todo === 'object' &&
                    !Array.isArray(todo) &&
                    todo.id !== undefined &&
                    todo.id !== null &&
                    todo.id !== '' &&
                    typeof todo.text === 'string' &&
                    typeof todo.completed === 'boolean'
            ),
            filter: ['all', 'active', 'completed'].includes(parsedState.filter)
                ? parsedState.filter
                : 'all',
            theme:
                typeof parsedState.theme === 'string'
                    ? parsedState.theme
                    : 'light',
        };
    } catch (error) {
        console.error('Unable to load application state:', error);
        return defaultState;
    }
}
