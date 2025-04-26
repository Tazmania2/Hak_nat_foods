// challenges.js

import { listChallenges, getPlayerStatus } from './funifierApi.js';

const challengesList = document.getElementById('challenges-list');
const searchBar = document.getElementById('search-bar');
const filterStatus = document.getElementById('filter-status');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const logoutBtn = document.getElementById('logout-btn');

let challenges = [];
let completedChallengeIds = [];

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.log('No authentication token found, redirecting to login page');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Logout function
function logout() {
  localStorage.removeItem('access_token');
  window.location.href = 'login.html';
}

async function loadChallenges() {
  // Check authentication before loading challenges
  if (!checkAuth()) return;
  
  try {
    const [allChallenges, playerStatus] = await Promise.all([
      listChallenges(),
      getPlayerStatus()
    ]);

    challenges = allChallenges;
    completedChallengeIds = playerStatus.challenge_progress.map(c => c.challenge);

    displayChallenges();
  } catch (error) {
    console.error('Error loading challenges:', error);
  }
}

function displayChallenges() {
  const searchText = searchBar.value.toLowerCase();
  const filter = filterStatus.value;

  challengesList.innerHTML = '';

  challenges
    .filter(challenge => challenge.challenge.toLowerCase().includes(searchText))
    .filter(challenge => {
      const isCompleted = completedChallengeIds.includes(challenge._id);
      if (filter === 'completed') return isCompleted;
      if (filter === 'incomplete') return !isCompleted;
      return true;
    })
    .forEach(challenge => {
      const isCompleted = completedChallengeIds.includes(challenge._id);

      const card = document.createElement('div');
      card.className = 'challenge-card';
      if (isCompleted) card.classList.add('completed');

      card.innerHTML = `
        <h2>${challenge.challenge}</h2>
        <p>${challenge.description || ''}</p>
      `;

      challengesList.appendChild(card);
    });
}

searchBar.addEventListener('input', displayChallenges);
filterStatus.addEventListener('change', displayChallenges);

// Menu toggle functionality
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Add logout event listener
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

// Initial load
loadChallenges();