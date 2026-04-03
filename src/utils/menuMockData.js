import { slugifyRestaurantName } from "./restaurantName";

const createItem = (id, name, price, isVeg, description = "") => ({
    id,
    name,
    price,
    isVeg,
    ...(description ? { description } : {}),
});

const createGenericMenu = (restaurantName) => {
    const slug = slugifyRestaurantName(restaurantName) || "restaurant";

    return [
        {
            categoryId: `${slug}_c1`,
            title: "Recommended",
            items: [
                createItem(`${slug}_101`, `${restaurantName} Special Combo`, 29900, false, "Signature combo meal"),
                createItem(`${slug}_102`, "Classic Veg Combo", 23900, true, "Best seller vegetarian combo"),
                createItem(`${slug}_103`, "Family Feast", 54900, false, "Value meal for 2-3 people"),
                createItem(`${slug}_104`, "Quick Bite Box", 19900, true, "Snacks and dip combo"),
            ],
        },
        {
            categoryId: `${slug}_c2`,
            title: "Main Course",
            items: [
                createItem(`${slug}_201`, `${restaurantName} Signature Bowl`, 26900, false),
                createItem(`${slug}_202`, "Spicy Delight", 24900, false),
                createItem(`${slug}_203`, "Paneer Supreme", 22900, true),
                createItem(`${slug}_204`, "Loaded Rice Meal", 21900, true),
            ],
        },
        {
            categoryId: `${slug}_c3`,
            title: "Sides & Beverages",
            items: [
                createItem(`${slug}_301`, "French Fries", 10900, true),
                createItem(`${slug}_302`, "Cheese Garlic Bread", 14900, true),
                createItem(`${slug}_303`, "Soft Drink", 6000, true),
                createItem(`${slug}_304`, "Chocolate Brownie", 9900, true),
            ],
        },
    ];
};

const baseMenuData = [
    {
        restaurantId: "kfc_001",
        name: "KFC",
        location: "India",
        cuisines: ["Fast Food", "Fried Chicken", "Burgers"],
        avgRating: 4.2,
        costForTwo: 400,
        menu: [
            {
                categoryId: "cat_1",
                title: "Recommended",
                items: [
                    createItem("item_101", "Ultimate Savings Bucket", 69900, false, "9 pcs Hot & Crispy, 6 Hot Wings"),
                    createItem("item_102", "Chicken Zinger Burger", 19900, false, "Crispy chicken fillet with lettuce & mayo"),
                    createItem("item_103", "Chicken Popcorn Combo", 24900, false),
                    createItem("item_104", "Double Down Burger", 28900, false),
                ],
            },
            {
                categoryId: "cat_2",
                title: "Chicken Buckets",
                items: [
                    createItem("item_201", "Hot & Crispy Bucket (6 pcs)", 54900, false),
                    createItem("item_202", "Hot Wings Bucket (10 pcs)", 44900, false),
                    createItem("item_203", "Boneless Strips Bucket", 47900, false),
                    createItem("item_204", "Smoky Grilled Bucket", 52900, false),
                ],
            },
            {
                categoryId: "cat_3",
                title: "Burgers",
                items: [
                    createItem("item_301", "Chicken Zinger Burger", 19900, false),
                    createItem("item_302", "Veg Zinger Burger", 14900, true),
                    createItem("item_303", "American Nashville Burger", 24900, false),
                    createItem("item_304", "Tandoori Veg Burger", 16900, true),
                ],
            },
            {
                categoryId: "cat_4",
                title: "Snacks & Sides",
                items: [
                    createItem("item_401", "French Fries (Medium)", 10900, true),
                    createItem("item_402", "Chicken Popcorn (Regular)", 12900, false),
                    createItem("item_403", "Peri Peri Fries", 12900, true),
                    createItem("item_404", "Mashed Potato Bowl", 9900, true),
                ],
            },
            {
                categoryId: "cat_5",
                title: "Beverages",
                items: [
                    createItem("item_501", "Pepsi 475ml", 6000, true),
                    createItem("item_502", "7UP 475ml", 6000, true),
                    createItem("item_503", "Mirinda 475ml", 6000, true),
                    createItem("item_504", "Chocolate Shake", 10900, true),
                ],
            },
        ],
    },
    {
        restaurantId: "ph_001",
        name: "Pizza Hut",
        location: "India",
        cuisines: ["Pizza", "Italian", "Fast Food"],
        avgRating: 4.1,
        costForTwo: 500,
        menu: [
            {
                categoryId: "ph_c1",
                title: "Recommended",
                items: [
                    createItem("ph_101", "Margherita Pizza (Medium)", 29900, true),
                    createItem("ph_102", "Veggie Supreme Pizza", 44900, true),
                    createItem("ph_103", "Tandoori Paneer Pizza", 47900, true),
                    createItem("ph_104", "Chicken Pepperoni Pizza", 52900, false),
                ],
            },
            {
                categoryId: "ph_c2",
                title: "Pizzas",
                items: [
                    createItem("ph_201", "Chicken Supreme Pizza", 49900, false),
                    createItem("ph_202", "Paneer Tikka Pizza", 46900, true),
                    createItem("ph_203", "Farmhouse Pizza", 45900, true),
                    createItem("ph_204", "Mexican Fiesta Pizza", 48900, true),
                ],
            },
            {
                categoryId: "ph_c3",
                title: "Sides",
                items: [
                    createItem("ph_301", "Garlic Breadsticks", 12900, true),
                    createItem("ph_302", "Chicken Wings", 19900, false),
                    createItem("ph_303", "Cheesy Dip", 4900, true),
                    createItem("ph_304", "Potato Wedges", 11900, true),
                ],
            },
        ],
    },
    {
        restaurantId: "bk_001",
        name: "Burger King",
        location: "India",
        cuisines: ["Burgers", "Fast Food"],
        avgRating: 4.0,
        costForTwo: 350,
        menu: [
            {
                categoryId: "bk_c1",
                title: "Burgers",
                items: [
                    createItem("bk_101", "Whopper", 19900, false),
                    createItem("bk_102", "Veg Whopper", 16900, true),
                    createItem("bk_103", "Chicken Makhani Burger", 18900, false),
                    createItem("bk_104", "Crispy Veg Burger", 11900, true),
                ],
            },
            {
                categoryId: "bk_c2",
                title: "Meals",
                items: [
                    createItem("bk_201", "Chicken Whopper Meal", 29900, false),
                    createItem("bk_202", "Veg Whopper Meal", 26900, true),
                    createItem("bk_203", "Crunchy Chicken Meal", 27900, false),
                ],
            },
            {
                categoryId: "bk_c3",
                title: "Sides & Drinks",
                items: [
                    createItem("bk_301", "French Fries", 10900, true),
                    createItem("bk_302", "Coca Cola", 6000, true),
                    createItem("bk_303", "Onion Rings", 12900, true),
                    createItem("bk_304", "Chocolate Thick Shake", 12900, true),
                ],
            },
        ],
    },
    {
        restaurantId: "mcd_001",
        name: "McDonald's",
        location: "India",
        cuisines: ["Burgers", "Fast Food", "Beverages"],
        avgRating: 4.1,
        costForTwo: 350,
        menu: [
            {
                categoryId: "mcd_c1",
                title: "Burgers",
                items: [
                    createItem("mcd_101", "McAloo Tikki Burger", 5900, true),
                    createItem("mcd_102", "McChicken Burger", 12900, false),
                    createItem("mcd_103", "McVeggie Burger", 9900, true),
                    createItem("mcd_104", "Big Spicy Chicken Burger", 19900, false),
                ],
            },
            {
                categoryId: "mcd_c2",
                title: "Meals",
                items: [
                    createItem("mcd_201", "McChicken Meal", 19900, false),
                    createItem("mcd_202", "McAloo Tikki Meal", 15900, true),
                    createItem("mcd_203", "Big Spicy Paneer Wrap Meal", 22900, true),
                ],
            },
            {
                categoryId: "mcd_c3",
                title: "Desserts",
                items: [
                    createItem("mcd_301", "McFlurry Oreo", 9900, true),
                    createItem("mcd_302", "Hot Fudge Sundae", 8900, true),
                    createItem("mcd_303", "Soft Serve Cone", 3900, true),
                ],
            },
        ],
    },
    {
        restaurantId: "theo_001",
        name: "Theobroma",
        location: "India",
        cuisines: ["Bakery", "Desserts", "Cakes"],
        avgRating: 4.5,
        costForTwo: 600,
        menu: [
            {
                categoryId: "theo_c1",
                title: "Cakes",
                items: [
                    createItem("theo_101", "Chocolate Truffle Cake", 55000, true),
                    createItem("theo_102", "Red Velvet Cake", 60000, true),
                    createItem("theo_103", "Dutch Chocolate Cake", 62000, true),
                    createItem("theo_104", "Fresh Cream Pineapple Cake", 52000, true),
                ],
            },
            {
                categoryId: "theo_c2",
                title: "Pastries",
                items: [
                    createItem("theo_201", "Blueberry Cheesecake Slice", 18000, true),
                    createItem("theo_202", "Opium Pastry", 16500, true),
                    createItem("theo_203", "Hazelnut Praline Pastry", 17000, true),
                ],
            },
            {
                categoryId: "theo_c3",
                title: "Snacks & Drinks",
                items: [
                    createItem("theo_301", "Butter Croissant", 9900, true),
                    createItem("theo_302", "Cold Coffee", 14000, true),
                    createItem("theo_303", "Chicken Quiche", 17500, false),
                ],
            },
        ],
    },
    {
        restaurantId: "bakingo_001",
        name: "Bakingo",
        location: "India",
        cuisines: ["Bakery", "Cakes", "Desserts"],
        avgRating: 4.3,
        costForTwo: 500,
        menu: [
            {
                categoryId: "bkgo_c1",
                title: "Cakes",
                items: [
                    createItem("bkgo_101", "Black Forest Cake", 49900, true),
                    createItem("bkgo_102", "Butterscotch Cake", 45900, true),
                    createItem("bkgo_103", "Chocolate Overload Cake", 54900, true),
                    createItem("bkgo_104", "Fresh Fruit Cake", 52900, true),
                ],
            },
            {
                categoryId: "bkgo_c2",
                title: "Cupcakes",
                items: [
                    createItem("bkgo_201", "Chocolate Cupcake", 9900, true),
                    createItem("bkgo_202", "Red Velvet Cupcake", 10900, true),
                    createItem("bkgo_203", "Vanilla Blueberry Cupcake", 9900, true),
                ],
            },
            {
                categoryId: "bkgo_c3",
                title: "Jar Cakes & Pastries",
                items: [
                    createItem("bkgo_301", "Belgian Chocolate Jar Cake", 14900, true),
                    createItem("bkgo_302", "Mango Jar Cake", 13900, true),
                    createItem("bkgo_303", "Pineapple Pastry", 8900, true),
                ],
            },
        ],
    },
];

const additionalRestaurantNames = [
    "Domino's Pizza",
    "Subway",
    "Taco Bell",
    "Starbucks Coffee",
    "La Pino'z Pizza",
    "Wow! Momo",
    "Haldiram's",
    "Bikanervala",
    "Behrouz Biryani",
    "Faasos",
    "Oven Story Pizza",
    "Biryani By Kilo",
    "Chinese Wok",
    "Samosa Party",
    "Natural Ice Cream",
    "NIC Ice Creams",
    "Chaayos",
    "Third Wave Coffee",
    "Barbeque Nation",
    "GLOBO Ice Creams",
    "LunchBox",
    "Sweet Truth",
    "Kwality Walls Frozen Dessert",
    "A2B - Adyar Ananda Bhavan",
    "Meghana Foods",
    "Nandhana Palace",
    "Leon's - Burgers & Wings",
    "Biryani Blues",
    "Box8 - Desi Meals",
    "Andhra Gunpowder",
    "Truffles",
    "Empire Restaurant",
    "Monginis",
    "FreshMenu",
    "Krispy Kreme",
    "Burger Singh",
    "RollsKing",
    "CakeZone",
    "Firangi Bake",
    "The Belgian Waffle Co.",
    "Keventers - Milkshakes",
    "Mad Over Donuts",
    "McCafe by McDonald's",
    "California Burrito",
    "Nasi and Mee",
];

const additionalMenuData = additionalRestaurantNames.map((name, index) => ({
    restaurantId: `generic_${String(index + 1).padStart(3, "0")}`,
    name,
    location: "India",
    cuisines: ["Multi Cuisine", "Fast Food"],
    avgRating: 4.0,
    costForTwo: 300,
    menu: createGenericMenu(name),
}));

const menuData = [...baseMenuData, ...additionalMenuData];

export const getMenuByRestaurantName = (restaurantName = "") => {
    const cleanRestaurantName = restaurantName.trim();
    if (!cleanRestaurantName) {
        return null;
    }

    const matchedRestaurant = menuData.find(
        (restaurant) => slugifyRestaurantName(restaurant.name) === cleanRestaurantName
    );

    if (matchedRestaurant) {
        return matchedRestaurant;
    }

    // Fallback menu so every restaurant card has a dummy menu.
    return {
        restaurantId: `dynamic_${slugifyRestaurantName(cleanRestaurantName) || "restaurant"}`,
        name: cleanRestaurantName,
        location: "India",
        cuisines: ["Multi Cuisine"],
        avgRating: 4.0,
        costForTwo: 300,
        menu: createGenericMenu(cleanRestaurantName),
    };
};

export default menuData;
