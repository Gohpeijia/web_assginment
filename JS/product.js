const FULL_MENU = [
    {
        id: "valrhona-chocolate",
        name: "Valrhona Chocolate",
        category: "Cream Cake",
        price: 11.99,
        priceWhole: 89.99,
        img: "../Assets/Food/Valrhona_Chocolate_Cake.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Bovine gelatine",
            "Almond",
            "Hazelnut"
        ]
    },

    {
        id: "chocolate-indulgence",
        name: "Chocolate Indulgence",
        category: "Cream Cake",
        price: 11.99,
        priceWhole: 89.99,
        img: "../Assets/Food/Chocolate_Indulgence.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten",
            "Soy"
        ]
    },

    {
        id: "new-york-cheesecake",
        name: "New York Cheesecake",
        category: "Cheesecake",
        price: 12.99,
        priceWhole: 99.99,
        img: "../Assets/Food/New_York_Cheesecake.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    },

    {
        id: "lychee-coffee-hazelnut",
        name: "Lychee Coffee Hazelnut",
        category: "Fruit Cake",
        price: 12.99,
        priceWhole: 119.99,
        img: "../Assets/Food/Lychee_Coffee_Hazelnut.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Bovine gelatine",
            "Wheat and gluten",
            "Almond",
            "Hazelnut"
        ]
    },

    {
        id: "blueberry-lemon-cake",
        name: "Blueberry Lemon Cake",
        category: "Fruit Cake",
        price: 13.99,
        priceWhole: 89.99,
        img: "../Assets/Food/Blueberry_Lemon_cake.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    },

    {
        id: "oolong-melon-cake",
        name: "Oolong Melon Cake",
        category: "Fruit Cake",
        price: 11.99,
        priceWhole: 109.99,
        img: "../Assets/Food/Oolong_melon_cake.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Bovine gelatine",
            "Wheat and gluten"
        ]
    },

    {
        id: "pistachio-raspberry",
        name: "Pistachio Raspberry",
        category: "Fruit Cake",
        price: 16.99,
        priceWhole: 129.99,
        img: "../Assets/Food/Pistachio_Raspberry.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Bovine gelatine",
            "Wheat and gluten",
            "Almond",
            "Pistachio"
        ]
    },

    {
        id: "strawberry-shortcake",
        name: "Strawberry Shortcake",
        category: "Fruit Cake",
        price: 10.99,
        priceWhole: 119.99,
        img: "../Assets/Food/Strawberry_cake.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    },

    {
        id: "tiramisu",
        name: "Tiramisu",
        category: "Tiramisu",
        price: 17.99,
        img: "../Assets/Food/Tiramisu.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Bovine gelatine",
            "Wheat and gluten"
        ]
    },

    {
        id: "fruit-tart",
        name: "Fruit Tart",
        category: "Tart",
        price: 3.99,
        img: "../Assets/Food/Fruit_Tart.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    },

    {
        id: "kochi-yuzu-mango-tart",
        name: "Kochi Yuzu Mango Tart",
        category: "Tart",
        price: 14.99,
        img: "../Assets/Food/Kochi_Yuzu_Mango_Tart.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Bovine gelatine",
            "Wheat and gluten",
            "Almond"
        ]
    },

    {
        id: "uji-matcha-tart",
        name: "Uji Matcha Tart",
        category: "Tart",
        price: 16.00,
        priceWhole: 16.00,
        img: "../Assets/Food/uji_matcha_tart.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Bovine gelatine",
            "Wheat and gluten",
            "Almond"
        ]
    },

    {
        id: "apple-pie",
        name: "Apple Pie",
        category: "Pie",
        price: 8.99,
        priceWhole: 99.99,
        img: "../Assets/Food/Apple_pie_slice.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    },

    {
        id: "lime-pie",
        name: "Lime Pie",
        category: "Pie",
        price: 8.99,
        priceWhole: 79.99,
        img: "../Assets/Food/Lime_pie.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    },

    {
        id: "caramel-almond-vanilla-crepe",
        name: "Caramel Almond Vanilla Crêpe",
        category: "Mille Crepe",
        price: 14.99,
        priceWhole: 109.99,
        img: "../Assets/Food/Caramel_Almond_Vanilla_Crêpe_have_slides.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten",
            "Almond"
        ]
    },

    {
        id: "musang-king-durian-crepe",
        name: "Musang King Durian Crêpe",
        category: "Mille Crepe",
        price: 18.99,
        priceWhole: 139.99,
        img: "../Assets/Food/Musang_King_Durian_Crêpe.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    },

    {
        id: "matcha-mille-crepe",
        name: "Matcha Mille Crepe",
        category: "Mille Crepe",
        price: 14.99,
        priceWhole: 111.99,
        img: "../Assets/Food/Matcha_mille_crepe.svg",
        allergens: [
            "Milk and dairy products",
            "Egg",
            "Wheat and gluten"
        ]
    }
];