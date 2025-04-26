// login.js

import { authenticate, createPlayer } from './funifierApi.js';

// Check if user is already logged in
function checkAlreadyLoggedIn() {
  const token = localStorage.getItem('access_token');
  if (token) {
    console.log('User already logged in, redirecting to home page');
    window.location.href = 'home.html';
  }
}

// Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const openRegisterBtn = document.getElementById('open-register');
const closeRegisterBtn = document.getElementById('close-register');
const registerModal = document.getElementById('register-modal');

// Check if already logged in
checkAlreadyLoggedIn();

// Open Modal
openRegisterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.classList.remove('hidden');
  registerModal.classList.add('show');
});

// Close Modal
closeRegisterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.classList.remove('show');
  registerModal.classList.add('hidden');
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('login-id').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!id || !password) {
    alert('Please fill all fields.');
    return;
  }

  try {
    const res = await authenticate(id, password);
    console.log('Auth response:', res);
    if (res?.access_token) {
      console.log('Login successful!');
      localStorage.setItem('access_token', res.access_token); // Save token for future API calls
      window.location.href = 'home.html'; // redirect to Home Page
    } else {
      alert('Login failed. Check your ID and password.');
    }
  } catch (error) {
    console.log('Login error:', error);
    alert('An error occurred during login.');
  }
});

// Handle Register
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const id = document.getElementById('register-id').value.trim();
  const email = document.getElementById('register-email').value.trim();

  if (!name || !id || !email) {
    alert('Please fill all registration fields.');
    return;
  }

  try {
    const res = await createPlayer({ id, name, email });
    console.log('Create player response:', res);

    if (res?._id) {
      alert('Registration successful! Please log in manually with your ID.');
      registerModal.classList.remove('show');
      registerModal.classList.add('hidden');
    } else {
      alert('Registration failed. Try again.');
    }
  } catch (error) {
    console.log('Registration error:', error);
    alert('An error occurred during registration.');
  }
});