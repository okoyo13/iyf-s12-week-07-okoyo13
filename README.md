# Week 07 – JavaScript Modules

## Live Demo

[View the live application here:](https://okoyo13.github.io/iyf-s12-week-07-okoyo13/)


This repository contains my Week 07 JavaScript project, focused on modular JavaScript, code organization, reusable functions, testing, and practical application development.

## Project Overview

The project contains three main parts:

### 1. To-Do List Application

A task management application built using HTML, CSS, and modular JavaScript.

The application demonstrates:

- Creating and managing tasks.
- Filtering tasks by status.
- Separating application logic from DOM manipulation.
- Managing application state.
- Saving and retrieving tasks using browser storage.

### 2. Shopping Cart

A separate shopping cart project demonstrating JavaScript functionality for handling products and cart operations.

Files are organized inside the `cart/` directory.

### 3. Daily Challenges

The daily challenges are organized into three shared files:

- `daily-challenges/index.html`
- `daily-challenges/styles.css`
- `daily-challenges/script.js`

All five daily challenges are included in these shared files.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- JavaScript Modules
- Local Storage
- Node.js
- npm
- ESLint
- Prettier
- Git and GitHub

## Project Structure

```text
iyf-s12-week-07-okoyo13/
│
├── index.html
├── styles.css
│
├── js/
│   ├── app.js
│   ├── state.js
│   ├── storage.js
│   ├── todo-logic.js
│   └── ui.js
│
├── tests/
│   └── todo-logic.test.js
│
├── cart/
│   ├── cart.html
│   ├── cart.js
│   └── images/
│
├── daily-challenges/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── eslint.config.js
├── .prettierrc
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/okoyo13/iyf-s12-week-07-okoyo13.git
```

### 2. Navigate into the project

```bash
cd iyf-s12-week-07-okoyo13
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the project

Open the root `index.html` using VS Code Live Server or another local development server.

## Code Quality and Testing

ESLint is used to check JavaScript code quality.

Run:

```bash
npm run lint
```

The project also includes tests for the To-Do List logic in:

```text
tests/todo-logic.test.js
```

## Learning Outcomes

Through this assignment, I practised:

- Organizing JavaScript applications using ES6 modules.
- Importing and exporting functions.
- Separating application logic, state management, storage, and UI.
- Writing reusable and maintainable code.
- Validating stored data.
- Writing tests for JavaScript functions.
- Using ESLint and Prettier.
- Collaborating through GitHub branches, pull requests, and code reviews.

## Collaboration

This assignment included collaborative development and peer code reviews.

**My Pull Request:**

[Refactor application into JavaScript modules – PR #1](https://github.com/okoyo13/iyf-s12-week-07-okoyo13/pull/1)

**Partner's Pull Request:**

[Wilfred Mutuma – PR #1](https://github.com/Wilfred-Mutuma/iyf-s12-week-07-Wilfred-Mutuma/pull/1)

## Author

**Rodricks Okoyo**

GitHub: [@okoyo13](https://github.com/okoyo13)
