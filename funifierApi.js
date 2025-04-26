// funifierApi.js

import { API_BASE_URL, API_KEY, BEARER_TOKEN } from './config.js';

// Initialize token from localStorage if available, otherwise use default
let currentToken = localStorage.getItem('access_token') || BEARER_TOKEN;

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

    console.log(`API Request: ${method} ${endpoint}`, body ? `with body: ${JSON.stringify(body)}` : '');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      console.log('API Error:', data);
    } else {
      console.log(`API Response from ${endpoint}:`, data);
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
    // Store token in localStorage for persistence across pages
    localStorage.setItem('access_token', res.access_token);
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
  const leaderboards = await request('GET', '/leaderboard');
  console.log('Leaderboards API response:', leaderboards);
  return leaderboards;
}

export async function getLeaderboardLeaders(boardId, { period = '', live = true } = {}) {
  const query = `?period=${period}&live=${live}`;
  console.log(`Fetching leaders for board ${boardId} with query ${query}`);
  
  // Make sure we have a valid boardId
  if (!boardId) {
    console.error('No board ID provided for getLeaderboardLeaders');
    return [];
  }
  
  // Try both POST and GET methods to see which one works
  try {
    // First try POST method
    const postResult = await request('POST', `/leaderboard/${boardId}/leader/aggregate${query}`, []);
    if (postResult && Array.isArray(postResult) && postResult.length > 0) {
      return postResult;
    }
    
    // If POST doesn't work, try GET method
    console.log('POST method returned no results, trying GET method');
    const getResult = await request('GET', `/leaderboard/${boardId}/leader${query}`);
    return getResult || [];
  } catch (error) {
    console.error('Error fetching leaderboard leaders:', error);
    return [];
  }
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

// Quiz APIs

export async function startQuiz(quizId, playerId = 'me') {
  const data = {
    quiz: quizId,
    player: playerId
  };
  return await request('POST', '/quiz/start', data);
}

export async function answerQuizQuestions(answers) {
  // answers must be an array of question answer objects
  return await request('POST', '/question/log/bulk', answers);
}

export async function finishQuiz(quizLogId) {
  const data = {
    quiz_log: quizLogId
  };
  return await request('POST', '/quiz/finish', data);
}

export async function listQuizQuestions(quizId) {
  return await request('GET', `/quiz/${quizId}/question`);
}
