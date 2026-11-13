// ============================================
// DAY 1: THEME PERSISTENCE
// ============================================

const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'dailyChallengesTheme';

function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    themeToggle.textContent =
        theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Load the saved theme when the page opens.
try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
} catch {
    applyTheme('light');
}

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark')
        ? 'light'
        : 'dark';

    applyTheme(newTheme);

    try {
        localStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
        console.error('Could not save theme preference:', error);
    }
});

// ============================================
// DAY 2: RECENT SEARCHES
// ============================================

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const historyList = document.getElementById('history-list');
const searchResult = document.getElementById('search-result');

const HISTORY_KEY = 'dailyChallengesRecentSearches';
const MAX_SEARCHES = 5;

let recentSearches = [];

function loadRecentSearches() {
    try {
        const savedSearches = JSON.parse(localStorage.getItem(HISTORY_KEY));

        if (Array.isArray(savedSearches)) {
            recentSearches = savedSearches
                .filter((item) => typeof item === 'string')
                .slice(0, MAX_SEARCHES);
        }
    } catch (error) {
        recentSearches = [];
        console.error('Could not load search history:', error);
    }
}

function saveRecentSearches() {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(recentSearches));
    } catch (error) {
        console.error('Could not save search history:', error);
    }
}

function renderSearchHistory() {
    historyList.innerHTML = '';

    recentSearches.forEach((search) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');

        button.textContent = search;
        button.classList.add('history-item');
        button.type = 'button';

        button.addEventListener('click', () => {
            performSearch(search);
        });

        listItem.appendChild(button);
        historyList.appendChild(listItem);
    });
}

function performSearch(searchTerm) {
    const search = searchTerm.trim();

    if (!search) {
        return;
    }

    // Remove an existing matching search, ignoring letter case.
    recentSearches = recentSearches.filter(
        (item) => item.toLowerCase() !== search.toLowerCase()
    );

    // Add the newest search at the beginning.
    recentSearches.unshift(search);

    // Keep only the five most recent searches.
    recentSearches = recentSearches.slice(0, MAX_SEARCHES);

    saveRecentSearches();
    renderSearchHistory();

    searchResult.textContent = `You searched for: ${search}`;
    searchInput.value = '';
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(searchInput.value);
});

// Load and display previous searches when the page opens.
loadRecentSearches();
renderSearchHistory();

// ============================================
// DAY 3: FORM AUTO-SAVE
// ============================================

const autoSaveForm = document.getElementById('autosave-form');
const autoSaveStatus = document.getElementById('autosave-status');

const DRAFT_KEY = 'dailyChallengesFormDraft';

function saveFormDraft() {
    const formData = {
        name: autoSaveForm.elements.name.value,
        email: autoSaveForm.elements.email.value,
        message: autoSaveForm.elements.message.value,
    };

    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
        autoSaveStatus.textContent = 'Draft saved automatically.';
    } catch (error) {
        autoSaveStatus.textContent = 'Could not save your draft.';
        console.error('Could not save form draft:', error);
    }
}

function loadFormDraft() {
    try {
        const savedDraft = localStorage.getItem(DRAFT_KEY);

        if (!savedDraft) {
            return;
        }

        const formData = JSON.parse(savedDraft);

        autoSaveForm.elements.name.value = formData.name || '';
        autoSaveForm.elements.email.value = formData.email || '';
        autoSaveForm.elements.message.value = formData.message || '';

        autoSaveStatus.textContent = 'Your previous draft has been recovered.';
    } catch (error) {
        autoSaveStatus.textContent = 'Could not recover your previous draft.';
        console.error('Could not load form draft:', error);
    }
}

// Recover saved information when the page opens.
loadFormDraft();

// Automatically save all form fields every five seconds.
const autoSaveInterval = setInterval(saveFormDraft, 5000);

// Clear the saved draft when the form is submitted.
autoSaveForm.addEventListener('submit', (event) => {
    event.preventDefault();

    clearInterval(autoSaveInterval);

    try {
        localStorage.removeItem(DRAFT_KEY);
        autoSaveForm.reset();
        autoSaveStatus.textContent = 'Form submitted. Saved draft cleared.';
    } catch (error) {
        autoSaveStatus.textContent = 'Could not clear the saved draft.';
        console.error('Could not clear form draft:', error);
    }
});
