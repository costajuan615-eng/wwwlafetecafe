export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  badge?: "Popular" | "#1 most liked";
  image?: string;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    name: "Brunch Menu",
    items: [
      { name: "Chicken & Waffles", price: "$18.40", description: "Fluffy Buttermilk Waffle with Crispy Buttermilk Chicken, with choice of butter.", badge: "Popular", image: "chicken-waffles" },
      { name: "Lobster Benedict", price: "$36.80", description: "Sautéed Lobster, Sweet Cornbread, 2 Eggs topped with Hollandaise, served with Home Fries.", image: "lobster-benedict" },
      { name: "Bacon & Avocado Croissant", price: "$17.25", description: "Bacon, Avocado, Egg, Feta Cheese, served with Home Fries.", image: "bacon-avocado-croissant" },
      { name: "B.Y.O.B", price: "$14.95", description: "Build Your Own Breakfast. Choices: Eggs, Bacon, Sausage, Sherry Tomatoes, Home Fries, Grits.", image: "byob" },
      { name: "Chilaquiles", price: "$16.10", description: "Fresh Tortilla Chips, Green Salsa, Queso Fresco, Crema Fresco, Egg, Avocado, Onions.", image: "chilaquiles" },
      { name: "Monte Cristo Sandwich", price: "$18.40", description: "Turkey, Ham & Egg and your choice of Cheese served between slices of French Toast, served with Home Fries.", image: "monte-cristo" },
      { name: "Salmon Toast", price: "$20.70", description: "Toasted Sourdough, topped with Avocado, Eggs, Sautéed Spinach and Grilled Salmon.", image: "salmon-toast" },
      { name: "La Fête Croissant", price: "$17.25", description: "Marinated Grilled Steak, Egg, Peppers, Onions, Aioli, Swiss Cheese, served with Home Fries.", image: "la-fete-croissant" },
      { name: "La Fête French Toast", price: "$18.40", description: "Served with 2 Eggs, Bacon & Home Fries. Add Strawberry, Banana Foster or Fresh Fruit Topping.", image: "french-toast" },
      { name: "Shrimp & Grits", price: "$20.70", description: "Savory Grits with Extra Jumbo Shrimp and Cajun Sauce. Make it La Fête style with Tomatoes, Bell Peppers, Onion, Cajun Sauce, Andouille Sausage & Cheese.", badge: "Popular", image: "shrimp-grits" },
      { name: "SW Avocado Toast", price: "$16.10", description: "Five Grain Toast, Avocado Spread, Grilled Corn, Green Chile, Queso Fresco, Avocado Cream & SW Sauce.", image: "sw-avocado-toast" },
      { name: "Steak Skillet", price: "$19.55", description: "Home Fries topped with Marinated Grilled Steak, 2 Eggs, Cheese, Peppers, Onions, Pico de Gallo and SW Sauce.", badge: "Popular", image: "steak-skillet" },
      { name: "Bruschetta Avocado Toast", price: "$16.10", description: "Five Grain Toast, Avocado Spread, Bruschetta.", image: "bruschetta-avocado-toast" },
      { name: "Fish & Grits", price: "$18.40", description: "Savory Grits served with 2 pieces of Fried Catfish.", image: "fish-grits" },
      { name: "Sausage Croissant", price: "$14.95", description: "Maple Sausage, Egg & Sausage Gravy. Served with Home Fries.", image: "sausage-croissant" },
      { name: "Salmon Croissant", price: "$17.25", description: "Grilled Salmon, Spinach, Sherry Tomatoes, Red Onion, Egg, Lemon Dill Sauce, served with Home Fries.", image: "salmon-croissant" },
    ],
  },
  {
    name: "Lunch/Dinner Apps",
    items: [
      { name: "Soul Food Eggroll", price: "$16.10", description: "BBQ Chicken, Mac, Collard Greens.", badge: "Popular", image: "soul-food-eggroll" },
      { name: "La Fête Eggroll", price: "$16.10", description: "Mojo Pork, Spanish Rice, Maduro.", image: "la-fete-eggroll" },
      { name: "Parmesan Truffle Chips", price: "$13.80", description: "Served with Spicy Aioli & Chimichurri Aioli.", image: "parmesan-truffle-chips" },
      { name: "6 PC Wings", price: "$10.35", description: "La Fête Grilled, Honey Hennessey, Lemon Pepper, Sweet Buffalo, Chillin' BBQ.", image: "wings" },
      { name: "Rib Rolls", price: "$16.10", description: "BBQ Pulled Pork & Rib Meat, Onions and Cheese.", image: "rib-rolls" },
      { name: "SW Eggroll", price: "$16.10", description: "Chicken, Green Chile, Avocado, Rice.", image: "sw-eggroll" },
      { name: "Philly Eggroll", price: "$16.10", description: "Sliced Steak, Peppers, Onion, Provolone Cheese.", image: "philly-eggroll" },
    ],
  },
  {
    name: "Burgers & Tacos",
    items: [
      { name: "Korean Pork Sandwich", price: "$14.95", description: "Korean BBQ Pork, Asian Slaw, Grilled Pineapple, served with Seasoned Fries.", image: "korean-pork-sandwich" },
      { name: "Korean Beef Tacos", price: "$14.95", description: "Corn Tortillas, Korean Beef, Asian Slaw, Sriracha Mayo.", image: "korean-beef-tacos" },
      { name: "Fried Pork Belly Tacos", price: "$14.95", description: "Corn Tortillas, Fried Pork Belly, Pickled Onions, Avocado Cream.", image: "pork-belly-tacos" },
      { name: "Chorizo Breakfast Tacos", price: "$10.35", description: "Corn Tortillas, Chorizo, Egg, Queso Fresco, Avocado, Pico de Gallo.", badge: "Popular", image: "chorizo-tacos" },
      { name: "Jerk Chicken Tacos", price: "$14.95", description: "Corn Tortillas, Jerk Chicken, Mango Salsa.", image: "jerk-chicken-tacos" },
      { name: "Bayou Burger", price: "$14.95", description: "1/2 LB Burger, Sriracha Mayo, Lettuce, Tomato, Cheese, Cajun Shrimp, served with Seasoned Fries.", image: "bayou-burger" },
      { name: "Blackened Shrimp Tacos", price: "$14.95", description: "Corn Tortillas, Blackened Shrimp, Cilantro Lime Sauce, Onion.", image: "blackened-shrimp-tacos" },
      { name: "Never 2 Late Burger", price: "$14.95", description: "1/2 LB Burger, Mayo, Lettuce, Tomato, Bacon, Fried Egg, Cheese, served with Seasoned Fries.", image: "never-2-late-burger" },
      { name: "Nutty Burger", price: "$14.95", description: "1/2 LB Burger, Creamy Peanut Butter, Bacon, served with Seasoned Fries.", image: "nutty-burger" },
      { name: "Simple Sandy Burger", price: "$12.65", description: "1/2 LB Burger, Mayo, Lettuce, Tomato, Cheese, served with Seasoned Fries.", image: "simple-sandy-burger" },
    ],
  },
  {
    name: "Entrees",
    items: [
      { name: "Jerk Chicken Pasta", price: "$17.60", badge: "#1 most liked", image: "jerk-chicken-pasta" },
      { name: "Blackened Chicken Pasta", price: "$17.60", image: "blackened-chicken-pasta" },
      { name: "Coastal Bruschetta Salmon", price: "$19.80", description: "Salmon topped with Bruschetta & Light Balsamic Glaze, served with two sides.", image: "coastal-bruschetta-salmon" },
      { name: "Chicken Alfredo Pasta", price: "$16.50", image: "chicken-alfredo" },
      { name: "Honey Sriracha Glazed Pork Chops", price: "$18.70", description: "Served with two sides.", image: "honey-sriracha-pork-chops" },
      { name: "Lemon Pepper Salmon Alfredo Pasta", price: "$18.70", image: "lemon-pepper-salmon-pasta" },
      { name: "La Fête Pasta", price: "$18.70", image: "la-fete-pasta" },
      { name: "Herb Crusted Chicken", price: "$17.60", image: "herb-crusted-chicken" },
      { name: "Spaghetti & Meatballs", price: "$15.40", image: "spaghetti-meatballs" },
      { name: "Vodka Garlic Shrimp Pasta", price: "$19.80", image: "vodka-garlic-shrimp-pasta" },
    ],
  },
  {
    name: "Brunch Sides",
    items: [
      { name: "Party Bacon", price: "$8.80", image: "party-bacon" },
      { name: "Fresh Fruit", price: "$2.20", image: "fresh-fruit" },
      { name: "Peach Cobbler Butter", price: "$2.20", image: "peach-cobbler-butter" },
      { name: "Strawberry Topping", price: "$2.20", image: "strawberry-topping" },
      { name: "Bacon", price: "$5.50", image: "bacon" },
      { name: "Strawberry Butter", price: "$2.20", image: "strawberry-butter" },
      { name: "Honey Butter", price: "$2.20", image: "honey-butter" },
      { name: "Coastal Pholourie", price: "$7.70", image: "coastal-pholourie" },
      { name: "Banana Foster", price: "$2.20", image: "banana-foster" },
      { name: "Buttermilk Waffle", price: "$6.60", image: "buttermilk-waffle" },
      { name: "Croissant", price: "$4.40", image: "croissant" },
      { name: "Five Grain Toast", price: "$2.20", image: "five-grain-toast" },
      { name: "French Toast", price: "$9.90", image: "french-toast-side" },
      { name: "Grits", price: "$4.40", image: "grits" },
      { name: "Home Fries", price: "$4.40", badge: "Popular", image: "home-fries" },
      { name: "Sausage", price: "$5.50", image: "sausage" },
      { name: "Side of Eggs", price: "$4.40", badge: "Popular", image: "side-eggs" },
      { name: "Sourdough Toast", price: "$2.20", badge: "Popular", image: "sourdough-toast" },
      { name: "Turkey Bacon", price: "$6.60", image: "turkey-bacon" },
      { name: "Turkey Sausage", price: "$6.60", image: "turkey-sausage" },
    ],
  },
  {
    name: "Lunch/Dinner Sides",
    items: [
      { name: "Add Chicken", price: "$5.50", image: "add-chicken" },
      { name: "Add Salmon", price: "$6.60", image: "add-salmon" },
      { name: "Add Shrimp", price: "$6.60", badge: "Popular", image: "add-shrimp" },
      { name: "Extra Dressing", price: "$1.10" },
      { name: "Fries", price: "$4.40", image: "fries" },
      { name: "Redskin Mash", price: "$4.40", image: "redskin-mash" },
      { name: "Rice", price: "$4.40", image: "rice" },
      { name: "Seasonal Veggies", price: "$4.40", image: "seasonal-veggies" },
      { name: "Side Caesar Salad", price: "$4.40", image: "caesar-salad" },
    ],
  },
  {
    name: "Kids Menu",
    items: [
      { name: "Kids Spaghetti & Meatball", price: "$8.80", image: "kids-spaghetti" },
      { name: "Kids Mac & Cheese", price: "$8.80", image: "kids-mac-cheese" },
      { name: "Kids Chicken Alfredo", price: "$8.80", image: "kids-chicken-alfredo" },
      { name: "Kids Butter Pasta", price: "$8.80", badge: "Popular", image: "kids-butter-pasta" },
      { name: "Kids Breakfast", price: "$8.80", image: "kids-breakfast" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Peach Cobbler Eggroll", price: "$8.80", badge: "Popular", image: "peach-cobbler-eggroll" },
      { name: "Strawberry Cheesecake Eggroll", price: "$8.80", image: "strawberry-cheesecake-eggroll" },
    ],
  },
  {
    name: "Drinks",
    items: [
      { name: "Coffee", price: "$3.30", image: "coffee" },
      { name: "Fountain Drinks", price: "$3.30", badge: "Popular", image: "fountain-drink" },
      { name: "Hot Chocolate", price: "$3.30", image: "hot-chocolate" },
      { name: "Juice", price: "$3.30", image: "juice" },
      { name: "Water", price: "$0.00", image: "water" },
    ],
  },
];

// Resolve dish image slugs to bundled asset URLs via Vite glob import.
const dishImages = import.meta.glob("../assets/dishes/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function getDishImage(slug?: string): string | undefined {
  if (!slug) return undefined;
  return dishImages[`../assets/dishes/${slug}.jpg`];
}

export const reviews = [
  { text: "The jerk chicken pasta was so good!", author: "Aleida G.", date: "03/04/23" },
  { text: "The food is always great!", author: "Eric H.", date: "07/20/23" },
  { text: "Absolutely delicious.", author: "Vianka S.", date: "08/10/23" },
  { text: "Tasty. My husband said it's the best chicken & waffles he's ever eaten. Reordering now.", author: "Adefunke F.", date: "07/13/23" },
  { text: "Always amazing!!! You get the exact same thing in the restaurant that you get delivered!", author: "Devin A.", date: "07/26/23" },
  { text: "I liked the food — the mac and cheese actually had truffles and the Philly cheesesteak egg rolls were really flavorful.", author: "Stephanie H.", date: "11/12/23" },
];

export const info = {
  name: "La Fête Cafe",
  tagline: "Caribbean-Southern brunch & soul in El Paso.",
  address: "1320 N Zaragoza Rd, El Paso, TX 79936",
  hours: "Mon 7:00 AM – 9:00 PM",
  phone: "(915) 260-9114",
  rating: 4.6,
  ratingCount: "260+",
  uberEats: "https://www.ubereats.com/",
};

