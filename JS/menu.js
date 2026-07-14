/* ─────────────────────────────────────────────
   CATALOGUE GENERATOR (Static DOM Parser)
   ───────────────────────────────────────────── */
const catalogueGrid = document.getElementById('catalogueGrid');
const noResultsText = document.getElementById('noResults');

// Parse initial cards on page load
const cards = Array.from(catalogueGrid.getElementsByClassName('cat-card'));

const initialItems = cards.map(card => {
  const priceAttr = card.getAttribute('data-price');
  const priceWholeAttr = card.getAttribute('data-price-whole');
  
  const item = {
    element: card,
    name: card.getAttribute('data-name'),
    category: card.getAttribute('data-category'),
    price: priceAttr ? parseFloat(priceAttr) : 0,
    priceWhole: priceWholeAttr ? parseFloat(priceWholeAttr) : null,
    img: card.querySelector('img').getAttribute('src')
  };

  // Bind click listener to open detail modal
  card.addEventListener('click', () => {
    openModal(item);
  });

  return item;
});

/* ─────────────────────────────────────────────
   MODAL LOGIC
   ───────────────────────────────────────────── */
const modal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const sizeOptionGroup = document.getElementById('sizeOptionGroup');

let currentModalItem = null;

// Function to open modal and inject data
function openModal(item) {
  currentModalItem = item;
  
  modalImg.src = item.img;
  modalTitle.textContent = item.name;

  // Hide Size option for Tarts, Pies, and Tiramisu 
  if (!item.priceWhole) {
    sizeOptionGroup.classList.add('hidden'); 
    modalPrice.textContent = `RM ${item.price.toFixed(2)}`;
  } else {
    sizeOptionGroup.classList.remove('hidden');

    // Reset buttons to 'Slice' by default
    const sizeBtns = sizeOptionGroup.querySelectorAll('.opt-btn');
    sizeBtns[0].classList.add('active');    
    sizeBtns[1].classList.remove('active'); 
    
    modalPrice.textContent = `RM ${item.price.toFixed(2)}`;
  }

  currentQty = 1;
  qtyValue.textContent = currentQty;
  
  modal.classList.remove('hidden'); 
}

// Close Modal when clicking the X
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Close Modal when clicking outside the box
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

/* ─────────────────────────────────────────────
   MODAL INTERACTIVITY & CHECKOUT
   ───────────────────────────────────────────── */

// 1. Handle Option Buttons (Size & Candles)
const optionGroups = document.querySelectorAll('.btn-group');
optionGroups.forEach(group => {
  const buttons = group.querySelectorAll('.opt-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons in this specific group
      buttons.forEach(b => b.classList.remove('active'));
      // Add active class to the clicked button
      btn.classList.add('active');

      if (btn.textContent === 'Slice' && currentModalItem) {
        modalPrice.textContent = `RM ${currentModalItem.price.toFixed(2)}`;
      } else if (btn.textContent === 'Whole Cake' && currentModalItem) {
        // Fallback to regular price just in case a cake is missing a priceWhole
        const wholePrice = currentModalItem.priceWhole ? currentModalItem.priceWhole : currentModalItem.price;
        modalPrice.textContent = `RM ${wholePrice.toFixed(2)}`;
      }
    });
  });
});

// 2. Handle Quantity Plus/Minus
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const qtyValue = document.getElementById('qtyValue');
let currentQty = 1;

qtyMinus.addEventListener('click', () => {
  if (currentQty > 1) { // Prevents going below 1
    currentQty--;
    qtyValue.textContent = currentQty;
  }
});

qtyPlus.addEventListener('click', () => {
  currentQty++;
  qtyValue.textContent = currentQty;
});

// 3. Handle Add to Cart Animation
const addToCartBtn = document.querySelector('.add-to-cart-btn');

addToCartBtn.addEventListener('click', () => {
  // Step A: Switch to Loading state
  addToCartBtn.classList.add('loading');
  
  addToCartBtn.innerHTML = `
    <div class="loading-dots">
      <p></p>
      <p></p>
      <p></p>
    </div>
  `;

  // Step B: Wait 1.5 seconds, then show Success state
  setTimeout(() => {
    addToCartBtn.classList.remove('loading');
    addToCartBtn.classList.add('success');
    addToCartBtn.innerHTML = '&#10004; ADDED TO CART'; // Adds a checkmark icon

    // Step C: Wait 1 more second, then close modal and reset
    setTimeout(() => {
      // Hide the modal (jumps back to the menu behind it)
      modal.classList.add('hidden');
      
      // Reset the button back to normal for the next cake
      addToCartBtn.classList.remove('success');
      addToCartBtn.innerHTML = 'ADD TO CART';
      
      // Reset quantity back to 1
      currentQty = 1;
      qtyValue.textContent = currentQty;
    }, 1000); // 1000ms = 1 second

  }, 1500); // 1500ms = 1.5 seconds loading
});

/* ─────────────────────────────────────────────
   SEARCH & FILTER LOGIC
   ───────────────────────────────────────────── */
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');

function updateCatalogue() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCat = categoryFilter.value.toLowerCase();
  const sortVal = sortSelect.value;

  // Filter items
  let matchedItems = initialItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query);
    const matchesCat = selectedCat === 'all' || item.category.toLowerCase().includes(selectedCat);
    return matchesSearch && matchesCat;
  });

  // Hide all cards first
  initialItems.forEach(item => {
    item.element.classList.add('hidden');
  });

  // Show only matched cards
  matchedItems.forEach(item => {
    item.element.classList.remove('hidden');
  });

  // Handle "No Results" message
  if (matchedItems.length === 0) {
    noResultsText.classList.remove('hidden');
  } else {
    noResultsText.classList.add('hidden');
  }

  // Handle sorting if requested
  if (sortVal === 'price-asc') {
    matchedItems.sort((a, b) => a.price - b.price);
    matchedItems.forEach(item => {
      catalogueGrid.appendChild(item.element);
    });
  } else if (sortVal === 'price-desc') {
    matchedItems.sort((a, b) => b.price - a.price);
    matchedItems.forEach(item => {
      catalogueGrid.appendChild(item.element);
    });
  } else {
    // Default sorting (original DOM layout order)
    initialItems.forEach(item => {
      catalogueGrid.appendChild(item.element);
    });
  }
}

searchInput.addEventListener('input', updateCatalogue);
categoryFilter.addEventListener('change', updateCatalogue);
sortSelect.addEventListener('change', updateCatalogue);