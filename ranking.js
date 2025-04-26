// ranking.js

import { listLeaderboards, getLeaderboardLeaders } from './funifierApi.js';

const typeFilter = document.getElementById('type-filter');
const timeFilter = document.getElementById('time-filter');
const leaderboardTableBody = document.querySelector('#leaderboard tbody');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const logoutBtn = document.getElementById('logout-btn');

let allLeaderboards = [];

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

async function loadLeaderboards() {
  // Check authentication before loading leaderboards
  if (!checkAuth()) return;
  
  try {
    allLeaderboards = await listLeaderboards();
    console.log('All leaderboards:', allLeaderboards);
    loadLeaders();
  } catch (error) {
    console.error('Error loading leaderboards:', error);
  }
}

async function loadLeaders() {
  const type = typeFilter.value;
  const time = timeFilter.value;

  const board = findBoardId(type);
  console.log(`Selected board for ${type}:`, board);
  
  if (!board) {
    console.error(`No leaderboard found for type: ${type}`);
    leaderboardTableBody.innerHTML = '<tr><td colspan="3">No leaderboard data available</td></tr>';
    return;
  }

  const period = (time === 'all') ? '' : (time === 'season' ? 'season' : '30days');
  console.log(`Fetching leaders for board ${board._id} with period: ${period}`);

  try {
    const leaders = await getLeaderboardLeaders(board._id, { period, live: true });
    console.log('Leaders data:', leaders);
    displayLeaders(leaders);
  } catch (error) {
    console.error('Error loading leaders:', error);
    leaderboardTableBody.innerHTML = '<tr><td colspan="3">Error loading leaderboard data</td></tr>';
  }
}

function findBoardId(type) {
  // Log all leaderboards to see their structure
  console.log('Finding board for type:', type);
  console.log('Available boards:', allLeaderboards);
  
  // Check if we have any leaderboards
  if (!allLeaderboards || allLeaderboards.length === 0) {
    console.error('No leaderboards available');
    return null;
  }
  
  // Try to find the board based on type
  const board = allLeaderboards.find(board => {
    // Check for player leaderboard
    if (type === 'player') {
      // Check different possible properties that might indicate a player leaderboard
      return board.principalType === 0 || 
             board.type === 'player' || 
             board.name?.toLowerCase().includes('player') ||
             board._id?.includes('player');
    }
    
    // Check for team leaderboard
    if (type === 'team') {
      // Check different possible properties that might indicate a team leaderboard
      return board.principalType === 1 || 
             board.type === 'team' || 
             board.name?.toLowerCase().includes('team') ||
             board._id?.includes('team');
    }
    
    return false;
  });
  
  // If no specific board found, return the first one as fallback
  if (!board && allLeaderboards.length > 0) {
    console.log('No specific board found, using first available board');
    return allLeaderboards[0];
  }
  
  return board;
}

function displayLeaders(leaders) {
  leaderboardTableBody.innerHTML = '';

  if (!leaders || leaders.length === 0) {
    leaderboardTableBody.innerHTML = '<tr><td colspan="3">No data available</td></tr>';
    return;
  }

  leaders.forEach((leader, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${leader.position || index + 1}</td>
      <td>${leader.name || leader.player || leader._id || 'Unknown'}</td>
      <td>${leader.total || leader.points || 0}</td>
    `;

    leaderboardTableBody.appendChild(row);
  });
}

// Event Listeners
typeFilter.addEventListener('change', loadLeaders);
timeFilter.addEventListener('change', loadLeaders);

// Menu toggle functionality
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Add logout event listener
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

// Initial load
loadLeaderboards();