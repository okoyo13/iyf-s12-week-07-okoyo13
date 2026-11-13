import { state, setState } from './state.js';

import {
    addTodo as addTodoLogic,
    toggleTodo as toggleTodoLogic,
    deleteTodo as deleteTodoLogic,
    clearCompleted as clearCompletedLogic,
    editTodo as editTodoLogic,
} from './todo-logic.js';

import { renderTodos, updateFilterButtons } from './ui.js';
const DOUBLE_CLICK_DELAY_MS = 250;
// DOM elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
// Task 13.3 - Save To-Do input draft using sessionStorage
const savedDraft = sessionStorage.getItem('todoDraft');

if (savedDraft !== null) {
    input.value = savedDraft;
}

// Save input as the user types
input.addEventListener('input', () => {
    sessionStorage.setItem('todoDraft', input.value);
});
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');
const clearCompletedBtn = document.getElementById('clear-completed');

// Generate the next task ID
let nextId =
    Math.max(0, ...state.todos.map((todo) => Number(todo.id) || 0)) + 1;

// Display tasks
function render() {
    renderTodos(state.todos, state.filter);
    updateFilterButtons(state.filter);
}

// Add a task
function addTodo(text) {
    if (text.trim() === '') {
        return;
    }

    const updatedTodos = addTodoLogic(state.todos, text, nextId);

    if (updatedTodos !== state.todos) {
        nextId++;
        setState({ todos: updatedTodos });
        render();

        input.value = '';
        sessionStorage.removeItem('todoDraft');
        input.focus();
    }
}

// Toggle a task's completed status
function toggleTodo(id) {
    setState({
        todos: toggleTodoLogic(state.todos, id),
    });

    render();
}

// Delete a task
function deleteTodo(id) {
    setState({
        todos: deleteTodoLogic(state.todos, id),
    });

    render();
}

// Change the active filter
function filterTasks(filter) {
    setState({ filter });
    render();
}

// Handle adding tasks with the form
form.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(input.value);
});

// Event delegation for task clicks and deletion
let clickTimer;

todoList.addEventListener('click', function (event) {
    const li = event.target.closest('li');

    if (!li || !todoList.contains(li)) {
        return;
    }

    const id = Number(li.dataset.id);

    if (event.target.closest('.delete-btn')) {
        clearTimeout(clickTimer);
        deleteTodo(id);
        return;
    }

    if (event.target.closest('.todo-text')) {
        clearTimeout(clickTimer);

        clickTimer = setTimeout(function () {
            toggleTodo(id);
        }, DOUBLE_CLICK_DELAY_MS);
    }
});

// Filter button listeners
filters.forEach((button) => {
    button.addEventListener('click', function () {
        filterTasks(button.dataset.filter);
    });
});

// Remove all completed tasks
clearCompletedBtn.addEventListener('click', function () {
    setState({
        todos: clearCompletedLogic(state.todos),
    });

    render();
});

// Edit task text on double-click
todoList.addEventListener('dblclick', function (event) {
    clearTimeout(clickTimer);

    const span = event.target.closest('.todo-text');

    if (!span) {
        return;
    }

    const li = span.closest('li');
    const id = Number(li.dataset.id);
    const todo = state.todos.find((todo) => todo.id === id);

    if (!todo) {
        return;
    }

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todo.text;
    editInput.classList.add('todo-text');

    span.replaceWith(editInput);
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);

    let finished = false;

    function finishEditing(save) {
        if (finished) {
            return;
        }

        finished = true;

        if (save && editInput.value.trim() !== '') {
            setState({
                todos: editTodoLogic(state.todos, id, editInput.value),
            });
        }

        render();
    }

    editInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            finishEditing(true);
        } else if (event.key === 'Escape') {
            finishEditing(false);
        }
    });

    editInput.addEventListener('blur', function () {
        finishEditing(true);
    });
});

// Initial display
render();
