const FULL_MENU = [
  { 
    name: "Valrhona Chocolate", 
    category: "Cream Cake", 
    price: 11.99, 
    priceWhole: 89.99, 
    img: "../Assets/Food/Valrhona_Chocolate_Cake.svg" 
  },
  { 
    name: "Chocolate Indulgence", 
    category: "Cream Cake", 
    price: 11.99, 
    priceWhole: 89.99, 
    img: "../Assets/Food/Chocolate_Indulgence.svg" 
  },
  { 
    name: "New York Cheesecake", 
    category: "Cheesecake", 
    price: 12.99, 
    priceWhole: 99.99, 
    img: "../Assets/Food/New_York_Cheesecake.svg" 
  },
  { 
    name: "Lychee Coffee Hazaelnut", 
    category: "Fruit Cake", 
    price: 12.99, 
    priceWhole: 119.99, 
    img: "../Assets/Food/Lychee_Coffee_Hazelnut.svg" 
  },
  { 
    name: "Blueberry Lemon Cake", 
    category: "Fruit Cake", 
    price: 13.99, 
    priceWhole: 89.99, 
    img: "../Assets/Food/Blueberry_Lemon_cake.svg" 
  },
  { 
    name: "Oolong Melon Cake", 
    category: "Fruit Cake", 
    price: 11.99, 
    priceWhole: 109.99, 
    img: "../Assets/Food/Oolong_melon_cake.svg" 
  },
  { 
    name: "Pistachio Raspberry", 
    category: "Fruit Cake", 
    price: 16.99, 
    priceWhole: 129.99, 
    img: "../Assets/Food/Pistachio_Raspberry.svg" 
  },
  { 
    name: "Strawberry Shortcake", 
    category: "Fruit Cake", 
    price: 10.99, 
    priceWhole: 119.99, 
    img: "../Assets/Food/Strawberry_cake.svg" 
  },
  { 
    name: "Tiramisu", 
    category: "Tiramisu", 
    price: 17.99, 
    img: "../Assets/Food/Tiramisu.svg" 
  },
  { 
    name: "Fruit Tart", 
    category: "Tart", 
    price: 3.99, 
    img: "../Assets/Food/Fruit_Tart.svg" 
  },
  { 
    name: "Kochi Yuzu Mango Tart", 
    category: "Tart", 
    price: 14.99, 
    img: "../Assets/Food/Kochi_Yuzu_Mango_Tart.svg" 
  },
  { 
    name: "Uji Matcha Tart", 
    category: "Tart", 
    price: 16.00, 
    priceWhole: 16.00, 
    img: "../Assets/Food/uji_matcha_tart.svg" 
  },
  { 
    name: "Apple Pie", 
    category: "Pie", 
    price: 8.99, 
    priceWhole: 99.99, 
    img: "../Assets/Food/Apple_pie_slice.svg" 
  },
  { 
    name: "Lime Pie", 
    category: "Pie", 
    price: 8.99, 
    priceWhole: 79.99, 
    img: "../Assets/Food/Lime_pie.svg" 
  },
  { 
    name: "Caramel Almond Vanilla Crêpe", 
    category: "Mille Crepe", 
    price: 14.99, 
    priceWhole: 109.99, 
    img: "../Assets/Food/Caramel_Almond_Vanilla_Crêpe_have_slides.svg" 
  },
  { 
    name: "Musang King Durian Crêpe", 
    category: "Mille Crepe", 
    price: 18.99, 
    priceWhole: 139.99, 
    img: "../Assets/Food/Musang_King_Durian_Crêpe.svg" 
  },
  { 
    name: "Matcha Mille Crepe", 
    category: "Mille Crepe", 
    price: 14.99, 
    priceWhole: 111.99, 
    img: "../Assets/Food/Matcha_mille_crepe.svg" 
  }
];

/* ─────────────────────────────────────────────
   CATALOGUE GENERATOR
   ───────────────────────────────────────────── */
const catalogueGrid = document.getElementById('catalogueGrid');
const noResultsText = document.getElementById('noResults');

function renderCatalogue(itemsToRender) {
  catalogueGrid.innerHTML = '';

  /* Show "No Results" message if empty */
  if (itemsToRender.length === 0) {
    noResultsText.classList.remove('hidden');
    return;
  } else {
    noResultsText.classList.add('hidden');
  }

  // Loop through the array and build HTML for each cake 
  itemsToRender.forEach(item => {
    // If you forget a price, this falls back to 0.00
    const itemPrice = item.price ? item.price.toFixed(2) : "0.00"; 
    let priceHTML = '';
       if (!item.priceWhole) {
      /* Single price items (e.g. Tarts, Pies, Tiramisu) */
      priceHTML = `
        <div class="price-block single-price">
          <p class="price-value">RM ${itemPrice}</p>
        </div>
      `;
    } else {
      /* Show 'FROM' for whole cakes */
      priceHTML = `
        <div class="price-block single-price">
          <div class="price-label">From</div>
          <p class="price-value">RM ${itemPrice}</p>
        </div>
      `;
    }
    
    const card = document.createElement('div');
    card.className = 'cat-card card-hover-trigger';
    
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cat-card-body">
        <h3 class="cat-card-name hover-underline">${item.name}</h3>
        <p class="cat-card-category">${item.category}</p>
        ${priceHTML}
      </div>
    `;
    
    catalogueGrid.appendChild(card);
    card.addEventListener('click', () => openModal(item));  
  });
}

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
  
  modal.classList.remove('hidden'); // This is now safely outside the if/else block!
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
  let filtered = FULL_MENU.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchInput.value.toLowerCase());
    const filterCat = categoryFilter.value.toLowerCase();
    const matchesCat = filterCat === 'all' || item.category.toLowerCase().includes(filterCat);
    return matchesSearch && matchesCat;
  });

  const sortVal = sortSelect.value;
  if (sortVal === 'price-asc') filtered.sort((a, b) => (a.price || a.priceWhole) - (b.price || b.priceWhole));
  if (sortVal === 'price-desc') filtered.sort((a, b) => (b.price || b.priceWhole) - (a.price || a.priceWhole));

  renderCatalogue(filtered);
}

searchInput.addEventListener('input', updateCatalogue);
categoryFilter.addEventListener('change', updateCatalogue);
sortSelect.addEventListener('change', updateCatalogue);

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */

renderCatalogue(FULL_MENU);