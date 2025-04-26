// home.js

import { getPlayerStatus, listTeams } from './funifierApi.js';

const playerNameEl = document.getElementById('player-name');
const playerAvatarEl = document.getElementById('player-avatar');
const totalPointsEl = document.getElementById('total-points');
const totalChallengesEl = document.getElementById('total-challenges');
const levelProgressEl = document.getElementById('level-progress');
const teamNameEl = document.getElementById('team-name');
const teamAvatarEl = document.getElementById('team-avatar');
const editNameInput = document.getElementById('edit-name');
const editEmailInput = document.getElementById('edit-email');
const editInfoForm = document.getElementById('edit-info-form');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

let playerData = null;
let teamsData = [];

async function loadPlayerStatus() {
  const status = await getPlayerStatus();
  if (status) {
    playerData = status;
    playerNameEl.textContent = status.name || 'Player';
    playerAvatarEl.src = status.image?.small?.url || 'avatar_placeholder.png';
    totalPointsEl.textContent = status.total_points || 0;
    totalChallengesEl.textContent = status.total_challenges || 0;
    levelProgressEl.textContent = (status.level_progress?.percent_completed || 0) + '%';

    if (status.teams && status.teams.length > 0) {
      loadTeamInfo(status.teams[0]);
    }

    // Fill editable fields
    editNameInput.value = status.name || '';
    editEmailInput.value = status.email || '';
  }
}

async function loadTeamInfo(teamId) {
  const allTeams = await listTeams();
  if (allTeams && Array.isArray(allTeams)) {
    const playerTeam = allTeams.find(team => team._id === teamId);
    if (playerTeam) {
      teamNameEl.textContent = playerTeam.name || 'No Team';
      teamAvatarEl.src = playerTeam.image?.small?.url || 'team_placeholder.png';
    }
  }
}

editInfoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const updatedName = editNameInput.value.trim();
  const updatedEmail = editEmailInput.value.trim();

  if (updatedName && updatedEmail) {
    // Currently mock update, since update API is not provided
    console.log('Saved changes (mock):', { name: updatedName, email: updatedEmail });
    alert('Changes saved locally (mock).');
  }
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Initialize page
loadPlayerStatus();