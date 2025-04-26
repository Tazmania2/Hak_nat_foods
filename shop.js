// shop.js

import { listItems, purchaseItem, getPlayerStatus } from './funifierApi.js';

const shopItemsContainer = document.getElementById('shop-items');
const searchBar = document.getElementById('search-bar');

let items = [];
let playerId = '';

async function loadShop() {
  try {
    const [allItems, playerStatus] = await Promise.all([
      listItems(),
      getPlayerStatus()
    ]);

    items = allItems;
    playerId = playerStatus._id;

    displayItems();
  } catch (error) {
    console.error('Error loading shop items:', error);
  }
}

function displayItems() {
  const searchText = searchBar.value.toLowerCase();

  shopItemsContainer.innerHTML = '';

  items
    .filter(item => item.name.toLowerCase().includes(searchText))
    .forEach(item => {
      const card = document.createElement('div');
      card.className = 'shop-card';

      card.innerHTML = `
        <h2>${item.name}</h2>
        <p>${item.description || ''}</p>
        <button data-id="${item._id}">Buy</button>
      `;

      shopItemsContainer.appendChild(card);
    });

  // Attach event listeners to buy buttons
  document.querySelectorAll('.shop-card button').forEach(button => {
    button.addEventListener('click', handlePurchase);
  });
}

async function handlePurchase(event) {
  const itemId = event.target.getAttribute('data-id');

  if (!itemId || !playerId) return;

  try {
    const res = await purchaseItem({ playerId, itemId, quantity: 1 });

    if (res.status === 'OK') {
      alert('Purchase successful!');
    } else {
      alert('Purchase failed: ' + (res.restrictions?.join(', ') || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error purchasing item:', error);
    alert('Purchase error!');
  }
}

searchBar.addEventListener('input', displayItems);

// Initial load
loadShop();
