import test from 'node:test';
import assert from 'node:assert/strict';

import {
    addTodo,
    toggleTodo,
    deleteTodo,
    filterTodos,
    clearCompleted,
    editTodo,
    countActiveTodos,
} from '../js/todo-logic.js';

const sampleTodos = [
    { id: 1, text: 'Learn JavaScript', completed: false },
    { id: 2, text: 'Practice coding', completed: true },
    { id: 3, text: 'Build a project', completed: false },
];

test('adds a new task', () => {
    const result = addTodo(sampleTodos, 'Read a book', 4);

    assert.equal(result.length, 4);
    assert.equal(result[3].text, 'Read a book');
    assert.equal(result[3].completed, false);
});

test('toggles a task completion status', () => {
    const result = toggleTodo(sampleTodos, 1);

    assert.equal(result[0].completed, true);
});

test('deletes a task', () => {
    const result = deleteTodo(sampleTodos, 2);

    assert.equal(result.length, 2);
    assert.equal(
        result.some((todo) => todo.id === 2),
        false
    );
});

test('filters active tasks', () => {
    const result = filterTodos(sampleTodos, 'active');

    assert.equal(result.length, 2);
    assert.ok(result.every((todo) => !todo.completed));
});

test('rejects empty task text', () => {
    const result = addTodo(sampleTodos, '   ', 4);

    assert.equal(result.length, 3);
});

test('does not modify the original array when toggling a task', () => {
    const original = structuredClone(sampleTodos);

    toggleTodo(sampleTodos, 1);

    assert.deepEqual(sampleTodos, original);
});

test('clears completed tasks', () => {
    const result = clearCompleted(sampleTodos);

    assert.equal(result.length, 2);
    assert.ok(result.every((todo) => !todo.completed));
});

test('edits a task', () => {
    const result = editTodo(sampleTodos, 1, 'Learn HTML');

    assert.equal(result[0].text, 'Learn HTML');
});

test('counts active tasks', () => {
    assert.equal(countActiveTodos(sampleTodos), 2);
});
