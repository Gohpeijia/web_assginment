/* ─────────────────────────────────────────────
   CATALOGUE GENERATOR (Static DOM Parser)
   ───────────────────────────────────────────── */
const hasCatalogue = document.querySelector('.catalogue-grid');
const noResultsText = document.getElementById('noResults');

let initialItems = [];

function createCakeCardHTML(cake) {
    const wholePriceAttr = cake.priceWhole ? cake.priceWhole : '';
    return `
        <div class="cat-card card-hover-trigger" data-name="${cake.name}" data-price="${cake.price}" data-price-whole="${wholePriceAttr}" data-category="${cake.category}">
          <img src="${cake.img}" alt="${cake.name}">
          <div class="cat-card-body">
            <h3 class="cat-card-name hover-underline">${cake.name}</h3>
            <p class="cat-card-category">${cake.category}</p>
            <div class="price-block single-price">
              <div class="price-label">From</div>
              <p class="price-value">RM ${cake.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
    `;
}

function loadMenuToHTML() {
    if (!hasCatalogue || typeof FULL_MENU === 'undefined') return;

    FULL_MENU.forEach(cake => {
        let formattedCategory = cake.category.replace(/\s+/g, '-');
        if (formattedCategory === 'Cheese-Cake' || formattedCategory === 'Cheese-cake') {
            formattedCategory = 'Cheesecake';
        }
        
        const targetGrid = document.getElementById(`grid-${formattedCategory}`);
        
        if (targetGrid) {
            targetGrid.innerHTML += createCakeCardHTML(cake);
        }
    });

    // Parse newly created cards globally
    const cards = Array.from(document.querySelectorAll('.cat-card'));

    initialItems = cards.map(card => {
      const priceAttr = card.getAttribute('data-price');
      const priceWholeAttr = card.getAttribute('data-price-whole');
      
      const item = {
        element: card,
        parent: card.parentElement, // Save original grid container
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
}

// Execute on load
loadMenuToHTML();

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

  // 1. Hide all cards first
  initialItems.forEach(item => {
    item.element.classList.add('hidden');
  });

  // 2. Filter items globally
  let matchedItems = initialItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query);
    const matchesCat = selectedCat === 'all' || item.category.toLowerCase().includes(selectedCat);
    return matchesSearch && matchesCat;
  });

  // 3. Show matched items
  matchedItems.forEach(item => {
    item.element.classList.remove('hidden');
  });

  // 4. Handle "No Results" message
  if (noResultsText) {
    if (matchedItems.length === 0) {
      noResultsText.classList.remove('hidden');
    } else {
      noResultsText.classList.add('hidden');
    }
  }

  // 5. Handle sorting and DOM movement
  if (sortVal !== 'default') {
    // Sort globally
    matchedItems.sort((a, b) => sortVal === 'price-asc' ? a.price - b.price : b.price - a.price);
    
    // Move all sorted items into the first catalogue grid so they appear as one continuous list
    const firstGrid = document.querySelector('.catalogue-grid');
    matchedItems.forEach(item => {
      firstGrid.appendChild(item.element);
    });
  } else {
    // Restore items to their original sections in original order
    initialItems.forEach(item => {
      item.parent.appendChild(item.element);
    });
  }

  // 6. Hide or show sections and banners based on whether they have visible cards
  const sections = document.querySelectorAll('.catalogue-section');
  sections.forEach(section => {
    const visibleCards = section.querySelectorAll('.cat-card:not(.hidden)');
    const prevElement = section.previousElementSibling; // Check if there's a banner right before the section
    
    if (visibleCards.length === 0) {
      section.style.display = 'none';
      if (prevElement && prevElement.classList.contains('menu-banner')) {
        prevElement.style.display = 'none';
      }
    } else {
      section.style.display = '';
      if (prevElement && prevElement.classList.contains('menu-banner')) {
        prevElement.style.display = '';
      }
    }
  });
}

if (hasCatalogue) {
  searchInput.addEventListener('input', updateCatalogue);
  categoryFilter.addEventListener('change', updateCatalogue);
  sortSelect.addEventListener('change', updateCatalogue);
}