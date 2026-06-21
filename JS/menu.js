/* =============================================
   CAKE SECTION – cake-section.js
   Café Web Assignment – WEB1201 / WEB2014

   Features:
   1. Interactive repel effect on hover
   2. Cake bubbles return to origin
   3. Glow on proximity
   4. Particle burst on click
   5. Filterable / sortable catalogue below
   ============================================= */

/* ─────────────────────────────────────────────
   DATA – Edit this array to add/remove cakes in the catalogue
   ───────────────────────────────────────────── */
const FEATURED_CAKES = [
  {
    name: "Ceram Cake",
    category: "Creamcake",
    price: 10.00,
    bg: "#3D1C02",
    accent: "#8B4513",
    img: "../Assets/Food/Chocolate_Indulgence.svg",
  },
  {
    name: "Fruit Cake",
    category: "Fruitcake",
    price: 11.00,
    bg: "#3D1C02",
    accent: "#8B4513",
    img: "../Assets/Food/Oolong_melon_cake.svg",
  },
  {
    name: "Cheesecake",
    category: "Cheesecake",
    price: 9.00,
    bg: "#3D1C02",
    accent: "#8B4513",
    img: "../Assets/Food/New_York_Cheesecake.svg"
  },
  {
    name: "Pie",
    category: "Pie",
    price: 7.00,
    bg: "#3D1C02",
    accent: "#8B4513",
    img: "../Assets/Food/Apple_pie.svg",
  },
  {
    name: "Fruit Tart",
    category: "tart",
    price: 3.00,
    bg: "#3D1C02",
    accent: "#8B4513",
    img: "../Assets/Food/Fruit_tart.svg",
  },
  {
    name: "Mille Crepe",
    category: "cake",
    price: 12.00,
    bg: "#3D1C02",
    accent: "#8B4513",
    img: "../Assets/Food/Matcha_mille_crepe.svg",
  },
  {
    name: "Tiramisu",
    category: "Tiramisu",
    price: 17.00,
    bg: "#3D1C02",
    accent: "#8B4513",
    img: "../Assets/Food/Tiramisu.svg"
  },
];

/* ─────────────────────────────────────────────
   2. FULL MENU CATALOGUE ( ALL cakes)
   ───────────────────────────────────────────── */
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
    price:11.99,
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
    category: "tart",
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
    category: "tart",
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
  },
];

/* ─────────────────────────────────────────────
   PHYSICS CONSTANTS – tweak for different feel
   ───────────────────────────────────────────── */
const REPEL_RADIUS   = 130;  /* px – how close before cakes react   */
const REPEL_STRENGTH = 20;   /* how hard cakes are pushed away       */
const FRICTION       = 0.80; /* 0–1 – higher = slides more          */
const RETURN_SPEED   = 0.001; /* how fast cakes return to origin      */

/* ─────────────────────────────────────────────
   INTERACTIVE SCENE SETUP
   ───────────────────────────────────────────── */
const scene    = document.getElementById('scene');
const ringEl   = document.getElementById('cursorRing');
const dotEl    = document.getElementById('cursorDot');

/* inject floating scene label */
const sceneLabel = document.createElement('div');
sceneLabel.className = 'scene-title';
sceneLabel.textContent = 'Our Cakes';
scene.appendChild(sceneLabel);

let mouseX = -9999, mouseY = -9999;
let cakeEls  = [];
let positions = [];
let velocities = [];
let origins   = [];

/* Build cake bubbles */
function buildScene() {
  /* remove old bubbles if re-building */
  cakeEls.forEach(el => el.remove());
  cakeEls = []; positions = []; velocities = []; origins = [];

  const W = scene.offsetWidth;
  const H = scene.offsetHeight;
  const cols = 4;
  const rows = Math.ceil(FEATURED_CAKES.length / cols);
  const padX = 70;
  const padY = 40;
  const cellW = (W - padX * 2) / cols;
  const cellH = (H - padY * 2) / rows;

  FEATURED_CAKES.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    /* stagger position slightly so they don't line up perfectly */
    const jitterX = (Math.random() - 0.5) * 18;
    const jitterY = (Math.random() - 0.5) * 18;
    const ox = padX + col * cellW + cellW / 2 - 57 + jitterX;
    const oy = padY + row * cellH + cellH / 2 - 57 + jitterY + 30;

    positions.push({ x: ox, y: oy });
    velocities.push({ vx: 0, vy: 0 });
    origins.push({ x: ox, y: oy });

    /* build element */
    const el = document.createElement('div');
    el.className = 'cake';
    el.style.cssText = `
      left: ${ox}px;
      top:  ${oy}px;
    `;
    el.setAttribute('aria-label', `${item.name} – RM ${item.price}`);

    el.innerHTML = `
      <img src="${item.img}" alt="${item.name}"
           onerror="this.style.display='none'">
      <div class="cake-hint">${item.name}</div>
    `;

    /* click → particle burst */
    el.addEventListener('click', () => {
      spawnParticles(
        positions[i].x + 57,
        positions[i].y + 57,
        item.accent
      );
    });

    scene.appendChild(el);
    cakeEls.push(el);
  });
}

/* ─────────────────────────────────────────────
   MOUSE TRACKING
   ───────────────────────────────────────────── */
scene.addEventListener('mousemove', (e) => {
  const rect = scene.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  ringEl.style.left = mouseX + 'px';
  ringEl.style.top  = mouseY + 'px';
  dotEl.style.left  = mouseX + 'px';
  dotEl.style.top   = mouseY + 'px';
});

scene.addEventListener('mouseleave', () => {
  mouseX = -9999;
  mouseY = -9999;
});

/* ─────────────────────────────────────────────
   ANIMATION LOOP
   ───────────────────────────────────────────── */
function animate() {
  requestAnimationFrame(animate);

  const W = scene.offsetWidth;
  const H = scene.offsetHeight;

  positions.forEach((pos, i) => {
    const cx = pos.x + 57; /* centre of cake bubble */
    const cy = pos.y + 57;
    const dx = cx - mouseX;
    const dy = cy - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    /* repel force */
    if (dist < REPEL_RADIUS && dist > 0) {
      const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
      velocities[i].vx += (dx / dist) * force * REPEL_STRENGTH;
      velocities[i].vy += (dy / dist) * force * REPEL_STRENGTH;
      /* glow when nearby */
        cakeEls[i].querySelector('img').style.filter = `drop-shadow(0 0 10px ${FEATURED_CAKES[i].accent}BB)`;
        cakeEls[i].querySelector('.cake-hint').style.opacity = '1';
    } else {
      cakeEls[i].querySelector('.cake-hint').style.opacity = '0';
      cakeEls[i].querySelector('img').style.filter = 'none';
    }

    /* return-to-origin spring */
    velocities[i].vx += (origins[i].x - pos.x) * RETURN_SPEED;
    velocities[i].vy += (origins[i].y - pos.y) * RETURN_SPEED;

    /* friction */
    velocities[i].vx *= FRICTION;
    velocities[i].vy *= FRICTION;

    /* integrate */
    pos.x += velocities[i].vx;
    pos.y += velocities[i].vy;

    /* clamp to scene bounds */
    pos.x = Math.max(10, Math.min(W - 120, pos.x));
    pos.y = Math.max(10, Math.min(H - 40, pos.y));

    /* update DOM */
    cakeEls[i].style.left = pos.x + 'px';
    cakeEls[i].style.top  = pos.y + 'px';
  });
}

/* ─────────────────────────────────────────────
   PARTICLE BURST on click
   ───────────────────────────────────────────── */
function spawnParticles(x, y, color) {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 7;
    p.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      background: ${color};
      left:   ${x}px;
      top:    ${y}px;
    `;
    scene.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    let px = x, py = y;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    let life = 1;

    const tick = () => {
      life -= 0.035;
      px += vx;
      py += vy;
      vy += 0.18; /* gravity */
      p.style.left    = px + 'px';
      p.style.top     = py + 'px';
      p.style.opacity = life;
      if (life > 0) {
        requestAnimationFrame(tick); 
      } else {
        p.remove();
      }
    };
    requestAnimationFrame(tick);
  }
}

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
   const cat = item.category.toLowerCase();
    if (cat === 'tart' || cat === 'pie' || cat === 'tiramisu' || !item.priceWhole) {
      /* FIX: Removed the "From" label for single items */
      priceHTML = `
        <div class="price-block single-price">
          <span class="price-value">RM ${itemPrice}</span>
        </div>
      `;
    } else {
      /* Show 'FROM' for whole cakes */
      priceHTML = `
        <div class="price-block single-price">
          <div class="price-label">From</div>
          <span class="price-value">RM ${itemPrice}</span>
        </div>
      `;
    }
    
    const card = document.createElement('div');
    card.className = 'cat-card';
    
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cat-card-body">
        <h3 class="cat-card-name">${item.name}</h3>
        <span class="cat-card-category">${item.category}</span>
        ${priceHTML}
      </div>
    `;
    
    catalogueGrid.appendChild(card);
    card.addEventListener('click', () => openModal(item));  
  });
}

/* Call the function immediately to load the cakes on the screen */
renderCatalogue(FULL_MENU);

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
  const cat = item.category.toLowerCase();
  if (cat === 'tart' || cat === 'pie' || cat === 'tiramisu') {
    sizeOptionGroup.classList.add('hidden'); 
    
    // Show default single price
    modalPrice.textContent = `RM ${item.price.toFixed(2)}`;
  } else {
    sizeOptionGroup.classList.remove('hidden');

    // Reset buttons to 'Slices' by default
    const sizeBtns = sizeOptionGroup.querySelectorAll('.opt-btn');
    sizeBtns[0].classList.add('active');    
    sizeBtns[1].classList.remove('active'); 
    
    // Show default Slice price
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
      <span></span>
      <span></span>
      <span></span>
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
  
  if (sortVal === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sortVal === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

  renderCatalogue(filtered);
}

searchInput.addEventListener('input', updateCatalogue);
categoryFilter.addEventListener('change', updateCatalogue);
sortSelect.addEventListener('change', updateCatalogue);

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
buildScene();
animate();

/* rebuild scene on window resize */
window.addEventListener('resize', () => {
  buildScene();
});