import { filterTodos, countActiveTodos } from './todo-logic.js';

// DOM elements
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const filters = document.querySelectorAll('.filter');

// Create and return a task list item
export function createTodoElement(todo) {
    const todoElement = document.createElement('li');
    todoElement.dataset.id = todo.id;

    if (todo.completed) {
        todoElement.classList.add('completed');
    }

    const todoTextElement = document.createElement('span');
    todoTextElement.classList.add('todo-text');
    todoTextElement.textContent = todo.text;
    todoTextElement.title = 'Click to complete or undo; double-click to edit';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', 'Delete ' + todo.text);

    todoElement.appendChild(todoTextElement);
    todoElement.appendChild(deleteButton);

    return todoElement;
}

// Display tasks according to the selected filter
export function renderTodos(todos, currentFilter) {
    todoList.replaceChildren();

    const filteredTodos = filterTodos(todos, currentFilter);

    filteredTodos.forEach((todo) => {
        todoList.appendChild(createTodoElement(todo));
    });

    updateStats(todos);
}

// Update the number of incomplete tasks
export function updateStats(todos) {
    const remaining = countActiveTodos(todos);

    itemsLeft.textContent =
        remaining + (remaining === 1 ? ' item left' : ' items left');
}

// Update the active filter button
export function updateFilterButtons(currentFilter) {
    filters.forEach((button) => {
        button.classList.toggle(
            'active',
            button.dataset.filter === currentFilter
        );
    });
}
