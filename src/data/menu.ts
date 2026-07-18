export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  badge?: "Popular" | "#1 most liked";
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    name: "Brunch Menu",
    items: [
      { name: "Chicken & Waffles", price: "$18.40", description: "Fluffy Buttermilk Waffle with Crispy Buttermilk Chicken, with choice of butter.", badge: "Popular" },
      { name: "Lobster Benedict", price: "$36.80", description: "Sautéed Lobster, Sweet Cornbread, 2 Eggs topped with Hollandaise, served with Home Fries." },
      { name: "Bacon & Avocado Croissant", price: "$17.25", description: "Bacon, Avocado, Egg, Feta Cheese, served with Home Fries." },
      { name: "B.Y.O.B", price: "$14.95", description: "Build Your Own Breakfast. Choices: Eggs, Bacon, Sausage, Sherry Tomatoes, Home Fries, Grits." },
      { name: "Chilaquiles", price: "$16.10", description: "Fresh Tortilla Chips, Green Salsa, Queso Fresco, Crema Fresco, Egg, Avocado, Onions." },
      { name: "Monte Cristo Sandwich", price: "$18.40", description: "Turkey, Ham & Egg and your choice of Cheese served between slices of French Toast, served with Home Fries." },
      { name: "Salmon Toast", price: "$20.70", description: "Toasted Sourdough, topped with Avocado, Eggs, Sautéed Spinach and Grilled Salmon." },
      { name: "La Fête Croissant", price: "$17.25", description: "Marinated Grilled Steak, Egg, Peppers, Onions, Aioli, Swiss Cheese, served with Home Fries." },
      { name: "La Fête French Toast", price: "$18.40", description: "Served with 2 Eggs, Bacon & Home Fries. Add Strawberry, Banana Foster or Fresh Fruit Topping." },
      { name: "Shrimp & Grits", price: "$20.70", description: "Savory Grits with Extra Jumbo Shrimp and Cajun Sauce. Make it La Fête style with Tomatoes, Bell Peppers, Onion, Cajun Sauce, Andouille Sausage & Cheese.", badge: "Popular" },
      { name: "SW Avocado Toast", price: "$16.10", description: "Five Grain Toast, Avocado Spread, Grilled Corn, Green Chile, Queso Fresco, Avocado Cream & SW Sauce." },
      { name: "Steak Skillet", price: "$19.55", description: "Home Fries topped with Marinated Grilled Steak, 2 Eggs, Cheese, Peppers, Onions, Pico de Gallo and SW Sauce.", badge: "Popular" },
      { name: "Bruschetta Avocado Toast", price: "$16.10", description: "Five Grain Toast, Avocado Spread, Bruschetta." },
      { name: "Fish & Grits", price: "$18.40", description: "Savory Grits served with 2 pieces of Fried Catfish." },
      { name: "Sausage Croissant", price: "$14.95", description: "Maple Sausage, Egg & Sausage Gravy. Served with Home Fries." },
      { name: "Salmon Croissant", price: "$17.25", description: "Grilled Salmon, Spinach, Sherry Tomatoes, Red Onion, Egg, Lemon Dill Sauce, served with Home Fries." },
    ],
  },
  {
    name: "Lunch/Dinner Apps",
    items: [
      { name: "Soul Food Eggroll", price: "$16.10", description: "BBQ Chicken, Mac, Collard Greens.", badge: "Popular" },
      { name: "La Fête Eggroll", price: "$16.10", description: "Mojo Pork, Spanish Rice, Maduro." },
      { name: "Parmesan Truffle Chips", price: "$13.80", description: "Served with Spicy Aioli & Chimichurri Aioli." },
      { name: "6 PC Wings", price: "$10.35", description: "La Fête Grilled, Honey Hennessey, Lemon Pepper, Sweet Buffalo, Chillin' BBQ." },
      { name: "Rib Rolls", price: "$16.10", description: "BBQ Pulled Pork & Rib Meat, Onions and Cheese." },
      { name: "SW Eggroll", price: "$16.10", description: "Chicken, Green Chile, Avocado, Rice." },
      { name: "Philly Eggroll", price: "$16.10", description: "Sliced Steak, Peppers, Onion, Provolone Cheese." },
    ],
  },
  {
    name: "Burgers & Tacos",
    items: [
      { name: "Korean Pork Sandwich", price: "$14.95", description: "Korean BBQ Pork, Asian Slaw, Grilled Pineapple, served with Seasoned Fries." },
      { name: "Korean Beef Tacos", price: "$14.95", description: "Corn Tortillas, Korean Beef, Asian Slaw, Sriracha Mayo." },
      { name: "Fried Pork Belly Tacos", price: "$14.95", description: "Corn Tortillas, Fried Pork Belly, Pickled Onions, Avocado Cream." },
      { name: "Chorizo Breakfast Tacos", price: "$10.35", description: "Corn Tortillas, Chorizo, Egg, Queso Fresco, Avocado, Pico de Gallo.", badge: "Popular" },
      { name: "Jerk Chicken Tacos", price: "$14.95", description: "Corn Tortillas, Jerk Chicken, Mango Salsa." },
      { name: "Bayou Burger", price: "$14.95", description: "1/2 LB Burger, Sriracha Mayo, Lettuce, Tomato, Cheese, Cajun Shrimp, served with Seasoned Fries." },
      { name: "Blackened Shrimp Tacos", price: "$14.95", description: "Corn Tortillas, Blackened Shrimp, Cilantro Lime Sauce, Onion." },
      { name: "Never 2 Late Burger", price: "$14.95", description: "1/2 LB Burger, Mayo, Lettuce, Tomato, Bacon, Fried Egg, Cheese, served with Seasoned Fries." },
      { name: "Nutty Burger", price: "$14.95", description: "1/2 LB Burger, Creamy Peanut Butter, Bacon, served with Seasoned Fries." },
      { name: "Simple Sandy Burger", price: "$12.65", description: "1/2 LB Burger, Mayo, Lettuce, Tomato, Cheese, served with Seasoned Fries." },
    ],
  },
  {
    name: "Entrees",
    items: [
      { name: "Jerk Chicken Pasta", price: "$17.60", badge: "#1 most liked" },
      { name: "Blackened Chicken Pasta", price: "$17.60" },
      { name: "Coastal Bruschetta Salmon", price: "$19.80", description: "Salmon topped with Bruschetta & Light Balsamic Glaze, served with two sides." },
      { name: "Chicken Alfredo Pasta", price: "$16.50" },
      { name: "Honey Sriracha Glazed Pork Chops", price: "$18.70", description: "Served with two sides." },
      { name: "Lemon Pepper Salmon Alfredo Pasta", price: "$18.70" },
      { name: "La Fête Pasta", price: "$18.70" },
      { name: "Herb Crusted Chicken", price: "$17.60" },
      { name: "Spaghetti & Meatballs", price: "$15.40" },
      { name: "Vodka Garlic Shrimp Pasta", price: "$19.80" },
    ],
  },
  {
    name: "Brunch Sides",
    items: [
      { name: "Party Bacon", price: "$8.80" },
      { name: "Fresh Fruit", price: "$2.20" },
      { name: "Peach Cobbler Butter", price: "$2.20" },
      { name: "Strawberry Topping", price: "$2.20" },
      { name: "Bacon", price: "$5.50" },
      { name: "Strawberry Butter", price: "$2.20" },
      { name: "Honey Butter", price: "$2.20" },
      { name: "Coastal Pholourie", price: "$7.70" },
      { name: "Banana Foster", price: "$2.20" },
      { name: "Buttermilk Waffle", price: "$6.60" },
      { name: "Croissant", price: "$4.40" },
      { name: "Five Grain Toast", price: "$2.20" },
      { name: "French Toast", price: "$9.90" },
      { name: "Grits", price: "$4.40" },
      { name: "Home Fries", price: "$4.40", badge: "Popular" },
      { name: "Sausage", price: "$5.50" },
      { name: "Side of Eggs", price: "$4.40", badge: "Popular" },
      { name: "Sourdough Toast", price: "$2.20", badge: "Popular" },
      { name: "Turkey Bacon", price: "$6.60" },
      { name: "Turkey Sausage", price: "$6.60" },
    ],
  },
  {
    name: "Lunch/Dinner Sides",
    items: [
      { name: "Add Chicken", price: "$5.50" },
      { name: "Add Salmon", price: "$6.60" },
      { name: "Add Shrimp", price: "$6.60", badge: "Popular" },
      { name: "Extra Dressing", price: "$1.10" },
      { name: "Fries", price: "$4.40" },
      { name: "Redskin Mash", price: "$4.40" },
      { name: "Rice", price: "$4.40" },
      { name: "Seasonal Veggies", price: "$4.40" },
      { name: "Side Caesar Salad", price: "$4.40" },
    ],
  },
  {
    name: "Kids Menu",
    items: [
      { name: "Kids Spaghetti & Meatball", price: "$8.80" },
      { name: "Kids Mac & Cheese", price: "$8.80" },
      { name: "Kids Chicken Alfredo", price: "$8.80" },
      { name: "Kids Butter Pasta", price: "$8.80", badge: "Popular" },
      { name: "Kids Breakfast", price: "$8.80" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Peach Cobbler Eggroll", price: "$8.80", badge: "Popular" },
      { name: "Strawberry Cheesecake Eggroll", price: "$8.80" },
    ],
  },
  {
    name: "Drinks",
    items: [
      { name: "Coffee", price: "$3.30" },
      { name: "Fountain Drinks", price: "$3.30", badge: "Popular" },
      { name: "Hot Chocolate", price: "$3.30" },
      { name: "Juice", price: "$3.30" },
      { name: "Water", price: "$0.00" },
    ],
  },
];

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
  rating: 4.6,
  ratingCount: "260+",
  uberEats: "https://www.ubereats.com/",
};
