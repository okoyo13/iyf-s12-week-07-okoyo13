"use strict";

// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";
let nextId = 1;

// Create and return a task list item
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo.id;

  if (todo.completed) {
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.classList.add("todo-text");
  span.textContent = todo.text;
  span.title = "Click to complete or undo; double-click to edit";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", "Delete " + todo.text);

  li.appendChild(span);
  li.appendChild(deleteButton);

  return li;
}

// Display tasks according to the selected filter
function renderTodos() {
  todoList.replaceChildren();

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  filteredTodos.forEach((todo) => {
    todoList.appendChild(createTodoElement(todo));
  });

  updateStats();
}

// Add a task
function addTodo(text) {
  const trimmedText = text.trim();

  if (trimmedText === "") {
    return;
  }

  todos.push({
    id: nextId++,
    text: trimmedText,
    completed: false,
  });

  input.value = "";
  renderTodos();
  input.focus();
}

// Toggle a task's completed state
function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

// Delete a task
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// Update the number of incomplete tasks
function updateStats() {
  const remaining = todos.filter((todo) => !todo.completed).length;
  itemsLeft.textContent =
    remaining + (remaining === 1 ? " item left" : " items left");
}

// Change the active filter
function filterTodos(filter) {
  currentFilter = filter;

  filters.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });

  renderTodos();
}

// Handle adding tasks with the form
form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(input.value);
});

// Event delegation for task clicks and deletion

let clickTimer;

todoList.addEventListener("click", function (event) {
  const li = event.target.closest("li");

  if (!li || !todoList.contains(li)) {
    return;
  }

  const id = Number(li.dataset.id);

  if (event.target.closest(".delete-btn")) {
    clearTimeout(clickTimer);
    deleteTodo(id);
    return;
  }

  if (event.target.closest(".todo-text")) {
    clearTimeout(clickTimer);

    clickTimer = setTimeout(function () {
      toggleTodo(id);
    }, 250);
  }
});

// Filter button listeners
filters.forEach((button) => {
  button.addEventListener("click", function () {
    filterTodos(button.dataset.filter);
  });
});

// Remove all completed tasks
clearCompletedBtn.addEventListener("click", function () {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
});

// Bonus: Edit task text on double-click
todoList.addEventListener("dblclick", function (event) {
  clearTimeout(clickTimer);

  const span = event.target.closest(".todo-text");

  if (!span) {
    return;
  }

  const li = span.closest("li");
  const id = Number(li.dataset.id);
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return;
  }

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = todo.text;
  editInput.classList.add("todo-text");

  span.replaceWith(editInput);
  editInput.focus();
  editInput.setSelectionRange(editInput.value.length, editInput.value.length);

  let finished = false;

  function finishEditing(save) {
    if (finished) {
      return;
    }

    finished = true;

    const newText = editInput.value.trim();

    if (save && newText !== "") {
      todo.text = newText;
    }

    renderTodos();
  }

  editInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      finishEditing(true);
    } else if (event.key === "Escape") {
      finishEditing(false);
    }
  });

  editInput.addEventListener("blur", function () {
    finishEditing(true);
  });
});

// Initial display
renderTodos();
