// Add a new task without modifying the original array
export function addTodo(todos, text, id) {
    const trimmedText = text.trim();

    if (trimmedText === '') {
        return todos;
    }

    return [
        ...todos,
        {
            id,
            text: trimmedText,
            completed: false,
        },
    ];
}

// Toggle a task's completed status
export function toggleTodo(todos, id) {
    return todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
}

// Delete a task
export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

// Filter tasks
export function filterTodos(todos, filter) {
    if (filter === 'active') {
        return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
        return todos.filter((todo) => todo.completed);
    }

    return todos;
}

// Remove completed tasks
export function clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
}

// Edit a task's text
export function editTodo(todos, id, newText) {
    const trimmedText = newText.trim();

    if (trimmedText === '') {
        return todos;
    }

    return todos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
    );
}

// Count incomplete tasks
export function countActiveTodos(todos) {
    return todos.filter((todo) => !todo.completed).length;
}
