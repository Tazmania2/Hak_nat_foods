// funifierApi.js

import { API_BASE_URL, API_KEY, BEARER_TOKEN } from './config.js';

let currentToken = BEARER_TOKEN;

const defaultHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${currentToken}`
});

async function request(method, endpoint, body = null) {
  try {
    const options = {
      method,
      headers: defaultHeaders()
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      console.log('API Error:', data);
    }
    return data;
  } catch (error) {
    console.log('Network Error:', error);
  }
}

export async function authenticate(username, password) {
  const data = {
    apiKey: API_KEY,
    grant_type: 'password',
    username,
    password
  };
  const res = await request('POST', '/auth/token', data);
  if (res?.access_token) {
    currentToken = res.access_token;
  }
  return res;
}

export async function createPlayer({ id, name, email, password }) {
  const playerData = {
    _id: id,
    name,
    email,
    image: {
      small: { url: 'https://my.funifier.com/images/funny.png' },
      medium: { url: 'https://my.funifier.com/images/funny.png' },
      original: { url: 'https://my.funifier.com/images/funny.png' }
    },
    teams: ['cartoon'],
    friends: ['tom', 'spike', 'quacker'],
    extra: {
      country: 'USA',
      company: 'Tom & Jerry Inc.',
      sports: ['soccer', 'cycling', 'surf']
    }
  };

  const res = await request('POST', '/player', playerData);

  if (res?._id) {
    await authenticate(id, password);
  }

  return res;
}

export async function getPlayerStatus(playerId = 'me') {
  return await request('GET', `/player/${playerId}/status`);
}

export async function listTeams() {
  return await request('GET', '/team');
}

export async function getTeamStatus(teamId) {
  return await request('GET', `/team/${teamId}/status`);
}

export async function listChallenges() {
  return await request('GET', '/challenge');
}

export async function listLeaderboards() {
  return await request('GET', '/leaderboard');
}

export async function getLeaderboardLeaders(boardId, { period = '', live = true } = {}) {
  const query = `?period=${period}&live=${live}`;
  return await request('POST', `/leaderboard/${boardId}/leader/aggregate${query}`, []);
}

export async function listCatalogs() {
  return await request('GET', '/virtualgoods/catalog');
}

export async function listItems() {
  return await request('GET', '/virtualgoods/item');
}

export async function purchaseItem({ playerId, itemId, quantity = 1 }) {
  const purchaseData = {
    player: playerId,
    item: itemId,
    total: quantity
  };
  return await request('POST', '/virtualgoods/purchase', purchaseData);
}
