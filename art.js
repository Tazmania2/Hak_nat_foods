// art.js

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const logoutBtn = document.getElementById('logout-btn');

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

// Menu toggle functionality
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Add logout event listener
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

// Check authentication on page load
checkAuth(); 