let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// dom elements
const modal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const sizeOptionGroup = document.getElementById('sizeOptionGroup');
const viewCommentsBtn = document.getElementById('viewCommentsBtn');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const qtyValue = document.getElementById('qtyValue');
const addToCartBtn = document.querySelector('.add-to-cart-btn');

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const noResultsText = document.getElementById('noResults');

let initialItems = [];
let currentModalItem = null;
let currentQty = 1;
let isWholeCakeSelected = false;

// render menu
function loadMenuToHTML() {
    const hasCatalogue = document.querySelector('.catalogue-grid');
    if (!hasCatalogue || typeof FULL_MENU === 'undefined') return;

    FULL_MENU.forEach(cake => {
        let formattedCategory = cake.category.replace(/\s+/g, '-');
        if (formattedCategory === 'Cheese-Cake' || formattedCategory === 'Cheese-cake') {
            formattedCategory = 'Cheesecake';
        }

        const targetGrid = document.getElementById(`grid-${formattedCategory}`);
        if (!targetGrid) return;

        const card = document.createElement('div');
        card.className = 'cat-card card-hover-trigger';
        card.dataset.id = cake.id;
        card.dataset.name = cake.name;
        card.dataset.price = cake.price;
        card.dataset.category = cake.category;
        if (cake.priceWhole) {
            card.dataset.priceWhole = cake.priceWhole;
        }

        card.innerHTML = `
            <img src="${cake.img}" alt="${cake.name}">
            <div class="cat-card-body">
                <h3 class="cat-card-name hover-underline">${cake.name}</h3>
                <p class="cat-card-category">${cake.category}</p>
                <div class="price-block single-price">
                    <div class="price-label">From</div>
                    <p class="price-value">RM ${cake.price.toFixed(2)}</p>
                </div>
            </div>
        `;

        const item = {
            element: card,
            parent: targetGrid,
            id: cake.id,
            name: cake.name,
            category: cake.category,
            price: cake.price,
            priceWhole: cake.priceWhole || null,
            img: cake.img
        };

        card.addEventListener('click', () => openModal(item));
        targetGrid.appendChild(card);
        initialItems.push(item);
    });
}

// modal
function openModal(item) {
    currentModalItem = item;
    currentQty = 1;
    isWholeCakeSelected = false;

    if (modalImg) modalImg.src = item.img;
    if (modalTitle) modalTitle.textContent = item.name;
    if (viewCommentsBtn) {
        viewCommentsBtn.href = `review.html?product=${encodeURIComponent(item.id)}`;
    }

    if (sizeOptionGroup) {
        const sizeBtns = sizeOptionGroup.querySelectorAll('.opt-btn');
        if (!item.priceWhole) {
            sizeOptionGroup.classList.add('hidden');
        } else {
            sizeOptionGroup.classList.remove('hidden');
            if (sizeBtns.length >= 2) {
                sizeBtns[0].classList.add('active');
                sizeBtns[1].classList.remove('active');
            }
        }
    }

    updateModalPrice();
    if (qtyValue) qtyValue.textContent = currentQty;
    if (modal) modal.classList.remove('hidden');
}

function updateModalPrice() {
    if (!currentModalItem || !modalPrice) return;
    const unitPrice = isWholeCakeSelected && currentModalItem.priceWhole
        ? currentModalItem.priceWhole
        : currentModalItem.price;
    modalPrice.textContent = `RM ${unitPrice.toFixed(2)}`;
}

function closeModal() {
    if (modal) modal.classList.add('hidden');
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// options
const optionGroups = document.querySelectorAll('.btn-group');
optionGroups.forEach(group => {
    const buttons = group.querySelectorAll('.opt-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (group.parentElement === sizeOptionGroup || group.closest('#sizeOptionGroup')) {
                isWholeCakeSelected = (index === 1);
                updateModalPrice();
            }
        });
    });
});

// quantity
if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
        if (currentQty > 1) {
            currentQty--;
            if (qtyValue) qtyValue.textContent = currentQty;
        }
    });
}

if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
        currentQty++;
        if (qtyValue) qtyValue.textContent = currentQty;
    });
}

// add to cart
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        if (!currentModalItem) return;

        const selectedPrice = isWholeCakeSelected && currentModalItem.priceWhole
            ? currentModalItem.priceWhole
            : currentModalItem.price;

        const itemSize = isWholeCakeSelected && currentModalItem.priceWhole ? "Whole Cake" : "Slice";

        const existingItem = cart.find(item =>
            item.name === currentModalItem.name &&
            item.price === selectedPrice
        );

        if (existingItem) {
            existingItem.qty += currentQty;
        } else {
            cart.push({
                name: currentModalItem.name,
                price: selectedPrice,
                qty: currentQty,
                img: currentModalItem.img,
                size: itemSize
            });
        }

        saveCart();

        addToCartBtn.classList.add('success');
        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '&#10004; ADDED TO CART';

        setTimeout(() => {
            closeModal();
            addToCartBtn.classList.remove('success');
            addToCartBtn.innerHTML = originalText;
            currentQty = 1;
            if (qtyValue) qtyValue.textContent = currentQty;
        }, 500);
    });
}

// search & filter
function updateCatalogue() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCat = categoryFilter ? categoryFilter.value.toLowerCase() : 'all';
    const sortVal = sortSelect ? sortSelect.value : 'default';

    let matchedItems = initialItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(query);
        const matchesCat = selectedCat === 'all' || item.category.toLowerCase().includes(selectedCat);
        return matchesSearch && matchesCat;
    });

    initialItems.forEach(item => {
        item.element.classList.add('hidden');
    });

    matchedItems.forEach(item => {
        item.element.classList.remove('hidden');
    });

    if (noResultsText) {
        noResultsText.classList.toggle('hidden', matchedItems.length > 0);
    }

    if (sortVal !== 'default') {
        matchedItems.sort((a, b) => sortVal === 'price-asc' ? a.price - b.price : b.price - a.price);
        const firstGrid = document.querySelector('.catalogue-grid');
        if (firstGrid) {
            matchedItems.forEach(item => firstGrid.appendChild(item.element));
        }
    } else {
        initialItems.forEach(item => item.parent.appendChild(item.element));
    }

    const sections = document.querySelectorAll('.catalogue-section');
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.cat-card:not(.hidden)');
        const prevBanner = section.previousElementSibling;

        const isVisible = visibleCards.length > 0;
        section.style.display = isVisible ? '' : 'none';
        if (prevBanner && prevBanner.classList.contains('menu-banner')) {
            prevBanner.style.display = isVisible ? '' : 'none';
        }
    });
}

if (searchInput) searchInput.addEventListener('input', updateCatalogue);
if (categoryFilter) categoryFilter.addEventListener('change', updateCatalogue);
if (sortSelect) sortSelect.addEventListener('change', updateCatalogue);

// init
loadMenuToHTML();
