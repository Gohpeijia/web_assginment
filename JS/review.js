/* =====================================================
   SUNBAKE REVIEW PAGE
   ===================================================== */

const STORAGE_KEY = "sunbakeReviews";

/* =====================================================
   HTML ELEMENTS
   ===================================================== */

const productSelector =
    document.getElementById("productSelector");

const productImage =
    document.getElementById("productImage");

const productName =
    document.getElementById("productName");

const allergensList =
    document.getElementById("allergensList");

const averageStars =
    document.getElementById("averageStars");

const averageRating =
    document.getElementById("averageRating");

const reviewCount =
    document.getElementById("reviewCount");

const reviewList =
    document.getElementById("reviewList");

const noReviews =
    document.getElementById("noReviews");

const ratingFilter =
    document.getElementById("ratingFilter");

const reviewForm =
    document.getElementById("reviewForm");

const reviewerName =
    document.getElementById("reviewerName");

const reviewRating =
    document.getElementById("reviewRating");

const reviewComment =
    document.getElementById("reviewComment");

const characterCount =
    document.getElementById("characterCount");

const reviewMessage =
    document.getElementById("reviewMessage");

let selectedProductId = "";


/* =====================================================
   LOAD PRODUCT SELECTOR
   ===================================================== */

function loadProductSelector() {
    productSelector.innerHTML = "";

    FULL_MENU.forEach(function (product) {
        const option =
            document.createElement("option");

        option.value = product.id;
        option.textContent = product.name;

        productSelector.appendChild(option);
    });
}


/* =====================================================
   GET PRODUCT FROM URL
   ===================================================== */

function getProductFromURL() {
    const parameters =
        new URLSearchParams(window.location.search);

    const urlProduct =
        parameters.get("product");

    const productExists =
        FULL_MENU.some(function (product) {
            return product.id === urlProduct;
        });

    if (productExists) {
        return urlProduct;
    }

    return FULL_MENU[0].id;
}


/* =====================================================
   DISPLAY PRODUCT
   ===================================================== */

function displayProduct(productId) {
    const product =
        FULL_MENU.find(function (item) {
            return item.id === productId;
        });

    if (!product) {
        return;
    }

    selectedProductId = product.id;

    productSelector.value = product.id;

    productImage.src = product.img;
    productImage.alt = product.name;

    productName.textContent = product.name;

    displayAllergens(product.allergens);

    ratingFilter.value = "all";

    displayReviews();

    updateURL(product.id);
}


/* =====================================================
   DISPLAY ALLERGENS
   ===================================================== */

function displayAllergens(allergens) {
    allergensList.innerHTML = "";

    if (!allergens || allergens.length === 0) {
        const listItem =
            document.createElement("li");

        listItem.textContent =
            "No allergen information available.";

        allergensList.appendChild(listItem);

        return;
    }

    allergens.forEach(function (allergen) {
        const listItem =
            document.createElement("li");

        listItem.textContent = allergen;

        allergensList.appendChild(listItem);
    });
}


/* =====================================================
   UPDATE URL
   ===================================================== */

function updateURL(productId) {
    const newURL =
        `${window.location.pathname}?product=${productId}`;

    window.history.replaceState(
        {},
        "",
        newURL
    );
}


/* =====================================================
   PRODUCT CHANGE EVENT
   ===================================================== */

productSelector.addEventListener(
    "change",
    function () {
        displayProduct(productSelector.value);
    }
);


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function getAllReviews() {
    const storedReviews =
        localStorage.getItem(STORAGE_KEY);

    if (storedReviews === null) {
        return [];
    }

    try {
        const parsedReviews =
            JSON.parse(storedReviews);

        if (Array.isArray(parsedReviews)) {
            return parsedReviews;
        }

        return [];

    } catch (error) {
        console.error(
            "Unable to read reviews:",
            error
        );

        return [];
    }
}


function saveAllReviews(reviews) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reviews)
    );
}


/* =====================================================
   SAMPLE REVIEWS
   ===================================================== */

function initialiseSampleReviews() {
    if (
        localStorage.getItem(STORAGE_KEY)
        !== null
    ) {
        return;
    }

    const sampleReviews = [
        {
            reviewId: "sample-1",
            productId: "valrhona-chocolate",
            name: "Emily",
            rating: 5,
            comment:
                "The chocolate flavour is rich and the cake is very soft.",
            date:
                "2026-07-12T10:00:00.000Z"
        },

        {
            reviewId: "sample-2",
            productId: "valrhona-chocolate",
            name: "Daniel",
            rating: 4,
            comment:
                "Beautiful presentation and good chocolate quality.",
            date:
                "2026-07-10T10:00:00.000Z"
        },

        {
            reviewId: "sample-3",
            productId: "new-york-cheesecake",
            name: "Sarah",
            rating: 5,
            comment:
                "Creamy, smooth and not too sweet.",
            date:
                "2026-07-09T10:00:00.000Z"
        }
    ];

    saveAllReviews(sampleReviews);
}


/* =====================================================
   GET REVIEWS FOR SELECTED PRODUCT
   ===================================================== */

function getSelectedProductReviews() {
    return getAllReviews().filter(
        function (review) {
            return (
                review.productId ===
                selectedProductId
            );
        }
    );
}


/* =====================================================
   CREATE STAR DISPLAY
   ===================================================== */

function createStars(rating) {
    const safeRating =
        Math.max(
            0,
            Math.min(5, Math.round(rating))
        );

    return (
        "★".repeat(safeRating) +
        "☆".repeat(5 - safeRating)
    );
}


/* =====================================================
   UPDATE AVERAGE RATING
   ===================================================== */

function updateAverageRating(reviews) {
    if (reviews.length === 0) {
        averageStars.textContent =
            "☆☆☆☆☆";

        averageRating.textContent =
            "0.0 / 5";

        reviewCount.textContent =
            "0 reviews";

        return;
    }

    const total =
        reviews.reduce(
            function (sum, review) {
                return sum + Number(review.rating);
            },
            0
        );

    const average =
        total / reviews.length;

    averageStars.textContent =
        createStars(average);

    averageRating.textContent =
        `${average.toFixed(1)} / 5`;

    if (reviews.length === 1) {
        reviewCount.textContent =
            "1 review";
    } else {
        reviewCount.textContent =
            `${reviews.length} reviews`;
    }
}
/* =====================================================
   CREATE REVIEW CARD
   ===================================================== */

function createReviewCard(review) {

    const card =
        document.createElement("article");

    card.className = "review-card";


    /* Review Header */

    const header =
        document.createElement("div");

    header.className =
        "review-card-header";


    const reviewer =
        document.createElement("h3");

    reviewer.textContent =
        review.name;


    const date =
        document.createElement("small");

    const reviewDate =
        new Date(review.date);


    if (Number.isNaN(reviewDate.getTime())) {

        date.textContent = "";

    } else {

        date.textContent =
            reviewDate.toLocaleDateString(
                "en-MY",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );
    }


    /* Stars */

    const stars =
        document.createElement("p");

    stars.className =
        "review-stars";

    stars.textContent =
        createStars(review.rating);

    stars.setAttribute(
        "aria-label",
        `${review.rating} out of 5 stars`
    );


    /* Comment */

    const comment =
        document.createElement("p");

    comment.className =
        "review-comment";

    comment.textContent =
        review.comment;


    header.appendChild(reviewer);
    header.appendChild(date);

    card.appendChild(header);
    card.appendChild(stars);
    card.appendChild(comment);


    /* Only logged-in users can see Delete */

    const isLoggedIn =
        sessionStorage.getItem("isLoggedIn") === "true";


    if (isLoggedIn) {

        const actionArea =
            document.createElement("div");

        actionArea.className =
            "review-actions";


        const deleteButton =
            document.createElement("button");

        deleteButton.type =
            "button";

        deleteButton.className =
            "delete-review-btn";

        deleteButton.textContent =
            "Delete";


        deleteButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to delete this comment?"
                    );

                if (confirmed) {

                    deleteReview(
                        review.reviewId
                    );
                }
            }
        );


        actionArea.appendChild(
            deleteButton
        );

        card.appendChild(
            actionArea
        );
    }


    return card;
}

/* =====================================================
   DISPLAY REVIEWS
   ===================================================== */

function displayReviews() {
    const productReviews =
        getSelectedProductReviews();

    const filterValue =
        ratingFilter.value;

    const filteredReviews =
        productReviews.filter(
            function (review) {
                if (filterValue === "all") {
                    return true;
                }

                return (
                    Number(review.rating) ===
                    Number(filterValue)
                );
            }
        );

    reviewList.innerHTML = "";

    filteredReviews
        .slice()
        .sort(function (reviewA, reviewB) {
            return (
                new Date(reviewB.date) -
                new Date(reviewA.date)
            );
        })
        .forEach(function (review) {
            reviewList.appendChild(
                createReviewCard(review)
            );
        });

    noReviews.hidden =
        filteredReviews.length > 0;

    updateAverageRating(productReviews);
}

/* =====================================================
   DELETE REVIEW
   ===================================================== */

function deleteReview(reviewId) {

    const isLoggedIn =
        sessionStorage.getItem("isLoggedIn") === "true";


    /* Prevent direct function use while logged out */

    if (!isLoggedIn) {

        alert(
            "Please log in before deleting a comment."
        );

        return;
    }


    const allReviews =
        getAllReviews();


    const updatedReviews =
        allReviews.filter(
            function (review) {

                return (
                    review.reviewId !==
                    reviewId
                );
            }
        );


    saveAllReviews(
        updatedReviews
    );


    reviewMessage.textContent =
        "The comment has been deleted.";


    displayReviews();
}

/* =====================================================
   RATING FILTER
   ===================================================== */

ratingFilter.addEventListener(
    "change",
    displayReviews
);


/* =====================================================
   SUBMIT REVIEW
   ===================================================== */

reviewForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const name =
            reviewerName.value.trim();

        const rating =
            Number(reviewRating.value);

        const comment =
            reviewComment.value.trim();

        if (
            name === "" ||
            comment === "" ||
            rating < 1 ||
            rating > 5
        ) {
            reviewMessage.textContent =
                "Please complete all fields.";

            return;
        }

        const allReviews =
            getAllReviews();

        const newReview = {
            reviewId:
                `${Date.now()}-${Math.random()
                    .toString(16)
                    .slice(2)}`,

            productId:
                selectedProductId,

            name: name,

            rating: rating,

            comment: comment,

            date:
                new Date().toISOString()
        };

        allReviews.push(newReview);

        saveAllReviews(allReviews);

        reviewForm.reset();

        characterCount.textContent =
            "0 / 300 characters";

        reviewMessage.textContent =
            "Thank you. Your review has been submitted.";

        ratingFilter.value = "all";

        displayReviews();
    }
);


/* =====================================================
   CHARACTER COUNTER
   ===================================================== */

reviewComment.addEventListener(
    "input",
    function () {
        characterCount.textContent =
            `${reviewComment.value.length} / 300 characters`;
    }
);


/* =====================================================
   INITIALISE REVIEW PAGE
   ===================================================== */

function initialiseReviewPage() {
    if (
        typeof FULL_MENU === "undefined" ||
        FULL_MENU.length === 0
    ) {
        console.error(
            "Product data could not be loaded."
        );

        return;
    }

    initialiseSampleReviews();

    loadProductSelector();

    displayProduct(
        getProductFromURL()
    );
}

initialiseReviewPage();

/* INTERACTIVE STAR RATING UI*/

(function () {
    const starBtns = document.querySelectorAll(".star-btn");
    const starLabel = document.getElementById("starRatingLabel");
    const reviewRatingSelect = document.getElementById("reviewRating");

    const ratingLabels = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent"
    };

    let currentRating = 0;

    /* Highlight all stars up to `upTo` */
    function highlightStars(upTo) {
        starBtns.forEach(function (star) {
            const val = Number(star.getAttribute("data-value"));
            star.classList.toggle("hovered", val <= upTo);
            star.classList.toggle("selected", val <= currentRating && upTo === 0);
        });
    }

    /* Set the selected rating */
    function selectRating(value) {
        currentRating = value;

        /* Sync to the hidden select so review.js form submit reads it */
        reviewRatingSelect.value = String(value);

        /* Update label */
        starLabel.textContent = ratingLabels[value] || "Click a star to rate";

        /* Mark selected stars */
        starBtns.forEach(function (star) {
            const val = Number(star.getAttribute("data-value"));
            star.classList.toggle("selected", val <= value);
            star.classList.remove("hovered");
        });
    }

    starBtns.forEach(function (star) {
        const val = Number(star.getAttribute("data-value"));

        /* Hover: light up stars */
        star.addEventListener("mouseenter", function () {
            highlightStars(val);
        });

        /* Mouse leave: restore to selected state */
        star.addEventListener("mouseleave", function () {
            highlightStars(0);
        });

        /* Click: confirm rating */
        star.addEventListener("click", function () {
            selectRating(val);
        });

        /* Keyboard: Enter or Space confirms rating */
        star.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectRating(val);
            }
        });
    });

    /* Reset stars when the form is reset */
    if (reviewForm) {
        reviewForm.addEventListener("reset", function () {
            currentRating = 0;
            starBtns.forEach(function (star) {
                star.classList.remove("selected", "hovered");
            });
            starLabel.textContent = "Click a star to rate";
        });
    }
})();