// quiz.js

import { listQuizQuestions, startQuiz, answerQuizQuestions, finishQuiz } from './funifierApi.js';

const quizSelector = document.getElementById('quiz-selector');
const quizContainer = document.getElementById('quiz-container');
const submitQuizBtn = document.getElementById('submit-quiz');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const logoutBtn = document.getElementById('logout-btn');

let currentQuizId = '';
let currentQuizLogId = '';
let questions = [];

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

async function loadQuiz(quizId) {
  // Check authentication before loading quiz
  if (!checkAuth()) return;
  
  try {
    quizContainer.innerHTML = '';
    submitQuizBtn.classList.add('hidden');

    const start = await startQuiz(quizId);
    currentQuizLogId = start?._id || start?.quiz_log || '';

    questions = await listQuizQuestions(quizId);

    if (questions.length > 0) {
      renderQuestions(questions);
      submitQuizBtn.classList.remove('hidden');
    } else {
      quizContainer.innerHTML = '<p>No questions available for this quiz.</p>';
    }
  } catch (error) {
    console.error('Error loading quiz:', error);
  }
}

function renderQuestions(questions) {
  quizContainer.innerHTML = '';

  questions.forEach((question, qIndex) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';

    questionDiv.innerHTML = `<h2>${qIndex + 1}. ${question.question}</h2>`;

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';

    question.choices.forEach(choice => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="question-${question._id}" value="${choice.answer}">
        ${choice.label}
      `;
      optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
  });
}

async function submitQuiz() {
  const answers = [];

  questions.forEach(question => {
    const selected = document.querySelector(`input[name="question-${question._id}"]:checked`);
    if (selected) {
      answers.push({
        quiz: currentQuizId,
        quiz_log: currentQuizLogId,
        question: question._id,
        answer: [selected.value],
        player: 'me'
      });
    }
  });

  if (answers.length === 0) {
    alert('Please answer at least one question before submitting.');
    return;
  }

  try {
    await answerQuizQuestions(answers);
    await finishQuiz(currentQuizLogId);
    alert('Quiz submitted successfully!');
    quizContainer.innerHTML = '<p>Thank you for completing the quiz!</p>';
    submitQuizBtn.classList.add('hidden');
  } catch (error) {
    console.error('Error submitting quiz:', error);
    alert('Error submitting the quiz.');
  }
}

quizSelector.addEventListener('change', (e) => {
  currentQuizId = e.target.value;
  if (currentQuizId) {
    loadQuiz(currentQuizId);
  }
});

submitQuizBtn.addEventListener('click', submitQuiz);

// Menu toggle functionality
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Add logout event listener
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

// Initial load
currentQuizId = quizSelector.value;
if (currentQuizId) {
  loadQuiz(currentQuizId);
}
