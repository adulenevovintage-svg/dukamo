import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Burgers
  {
    id: 'burg-beef',
    name: 'Dukamo Beef Burger',
    ingredients: 'Premium beef patty, house burger bun, lettuce, tomato, onions, signature sauce.',
    price: 520,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800' // Premium burger image
  },
  {
    id: 'burg-chicken',
    name: 'Dukamo Chicken Burger',
    ingredients: 'Grilled or crispy chicken breast, house burger bun, fresh lettuce, tomato, house spread.',
    price: 490,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800'
  },

  // Specialty Bowls
  {
    id: 'bowl-garden',
    name: 'Garden Mix',
    ingredients: 'Fresh sliced avocado, sweet corn kernels, shaved carrots, sliced green chili/jalapeños, red onion rings, fresh mixed lettuce, served with an aromatic house green herb vinaigrette/pesto dressing.',
    price: 420,
    category: 'bowls',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    isSpecialty: true
  },
  {
    id: 'bowl-chicken',
    name: 'Burrito Bowl Chicken',
    ingredients: 'Marinated grilled chicken strips, fluffy white rice, sliced avocado, shredded lettuce, shredded carrots, diced cucumbers, chopped fresh tomatoes, diced red onions, green bell peppers, served with fresh cilantro-lime green sauce.',
    price: 480,
    category: 'bowls',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    isSpecialty: true
  },
  {
    id: 'bowl-vegan',
    name: 'Burrito Bowl Vegan',
    ingredients: 'White rice, sliced avocado, hearty white beans, shredded lettuce, shredded carrots, chopped fresh tomatoes, diced green bell peppers, red onions, served with signature herb green sauce.',
    price: 410,
    category: 'bowls',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    isSpecialty: true
  },
  {
    id: 'bowl-tuna',
    name: 'Burrito Bowl Tuna',
    ingredients: 'Flaked premium tuna, white rice, sliced avocado, shredded lettuce, shredded carrots, diced tomatoes, chopped red onions, green chili, served with a zesty herb green dressing.',
    price: 450,
    category: 'bowls',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=800',
    isSpecialty: true
  },

  // Black Coffee
  {
    id: 'black-jebena',
    name: 'Jebena Coffee',
    description: 'Traditional Ethiopian clay pot brewing, rich and deeply aromatic.',
    price: 120,
    category: 'black-coffee',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'black-americano',
    name: 'Americano',
    description: 'Rich espresso shots topped with hot water.',
    price: 145,
    category: 'black-coffee',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'black-espresso',
    name: 'Espresso',
    description: 'Concentrated full-bodied shot of our signature single-origin blend.',
    price: 120,
    category: 'black-coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'black-double-espresso',
    name: 'Double Espresso',
    description: 'Two intense shots of premium single-origin extraction.',
    price: 240,
    category: 'black-coffee',
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'black-spris',
    name: 'Spris',
    description: 'Traditional Ethiopian layered mix of rich espresso, steamed milk, and smooth cream.',
    price: 145,
    category: 'milk-coffee',
    image: 'https://user15514.na.imgto.link/public/20260629/spri.avif'
  },
  {
    id: 'black-cold-brew',
    name: 'Cold Brew (Iced Coffee)',
    description: 'Slow-steeped over 16 hours for a smooth, naturally sweet, low-acid finish.',
    price: 140,
    category: 'black-coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'black-tonic',
    name: 'Espresso Tonic',
    description: 'Fizzy tonic water topped with a double shot of bright single-origin espresso.',
    price: 220,
    category: 'black-coffee',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'black-abatus',
    name: "Abatu's Special",
    description: 'A dedicated house recipe curated by our master roaster.',
    price: 250,
    category: 'black-coffee',
    isSpecialty: true,
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800'
  },

  // Milk-Based Coffee & Hot Drinks
  {
    id: 'milk-macchiato',
    name: 'Macchiato',
    description: 'Espresso stained with a dollop of silky hot micro-foam.',
    price: 190,
    category: 'milk-coffee',
    image: 'https://user15514.na.imgto.link/public/20260629/macch.avif'
  },
  {
    id: 'milk-cortado',
    name: 'Cortado',
    description: 'Equal parts double espresso and warm steamed milk.',
    price: 180,
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'milk-latte',
    name: 'Latte',
    description: 'Espresso in steamed milk with a delicate layer of micro-foam.',
    price: '260 / 280',
    prices: { small: 260, large: 280 },
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'milk-flavored-latte',
    name: 'Flavored Latte (Caramel / Vanilla)',
    description: 'Our standard silky latte infused with premium caramel or vanilla syrup.',
    price: '320 / 360',
    prices: { small: 320, large: 360 },
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1598908314732-07113901949e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'milk-chai-latte',
    name: 'Chai Latte',
    description: 'Fragrant spiced black tea concentrate steamed with fresh milk.',
    price: '300 / 340',
    prices: { small: 300, large: 340 },
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'milk-cappuccino',
    name: 'Cappuccino',
    description: 'Perfect balance of espresso, steamed milk, and a thick, luxurious cap of foam.',
    price: 260,
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'milk-mocha',
    name: 'Mocha',
    description: 'Rich espresso mixed with artisanal chocolate and steamed milk.',
    price: '310 / 350',
    prices: { small: 310, large: 350 },
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'milk-hot-chocolate',
    name: 'Hot Chocolate',
    description: 'Silky steamed milk combined with house chocolate blend.',
    price: 260,
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'milk-milk',
    name: 'Steamed Milk',
    description: 'Pure steamed fresh milk.',
    price: '130 / 170',
    prices: { small: 130, large: 170 },
    category: 'milk-coffee',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800'
  },

  // Non-Coffee & Teas
  {
    id: 'tea-matcha',
    name: 'Matcha',
    description: 'Premium stone-ground Japanese green tea with hot water or milk.',
    price: '580 / 600',
    prices: { small: 580, large: 600 },
    category: 'non-coffee',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tea-cascara',
    name: 'Cascara',
    description: 'A brilliant herbal infusion made from the dried husks of the coffee cherry.',
    price: 330,
    category: 'non-coffee',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tea-ethiopian',
    name: 'Ethiopian Tea',
    description: 'Aromatic local tea spiced with cloves, cinnamon, and cardamom.',
    price: '120 / 140',
    prices: { small: 120, large: 140 },
    category: 'non-coffee',
    image: 'https://user15514.na.imgto.link/public/20260629/tea.avif'
  },
  {
    id: 'tea-ginger',
    name: 'Ginger Tea',
    description: 'Freshly crushed spicy ginger root infusion with honey or sugar.',
    price: '140 / 160',
    prices: { small: 140, large: 160 },
    category: 'non-coffee',
    image: 'https://user15514.na.imgto.link/public/20260629/ging.avif'
  },

  // Fresh Juices & Smoothies
  {
    id: 'juice-avocado',
    name: 'Avocado Juice',
    description: 'Thick, creamy, traditional Ethiopian-style pureed avocado.',
    price: '300 / 330',
    prices: { small: 300, large: 330 },
    category: 'juices',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'juice-mango',
    name: 'Mango Juice',
    description: 'Fresh, vibrant mango puree with rich tropical sweetness.',
    price: '360 / 390',
    prices: { small: 360, large: 390 },
    category: 'juices',
    image: 'https://user15514.na.imgto.link/public/20260629/mango.avif'
  },
  {
    id: 'juice-flaxseed',
    name: 'Flaxseed Smoothie',
    description: 'Nutrient-rich drink blended with roasted local flaxseed.',
    price: '300 / 330',
    prices: { small: 300, large: 330 },
    category: 'juices',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'juice-passionfruit',
    name: 'Passionfruit Juice',
    description: 'Tangy and aromatic fresh passionfruit juice.',
    price: 360,
    category: 'juices',
    image: 'https://user15514.na.imgto.link/public/20260629/passion.avif'
  },
  {
    id: 'juice-pineapple',
    name: 'Pineapple Juice',
    description: 'Freshly pressed sweet and tangy pineapple juice.',
    price: 360,
    category: 'juices',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'juice-watermelon',
    name: 'Watermelon Juice',
    description: 'Refreshing, hydrating pure watermelon press.',
    price: 300,
    category: 'juices',
    image: 'https://user15514.na.imgto.link/public/20260629/water.avif'
  },
  {
    id: 'juice-papaya',
    name: 'Papaya Juice',
    description: 'Sweet, tropical fresh papaya puree.',
    price: 300,
    category: 'juices',
    image: 'https://user15514.na.imgto.link/public/20260629/pap.avif'
  },
  {
    id: 'juice-mixed',
    name: 'Mixed Juice',
    description: 'Layered or blended fresh seasonal fruits (Avocado, Mango, Papaya).',
    price: '360 / 390',
    prices: { small: 360, large: 390 },
    category: 'juices',
    image: 'https://user15514.na.imgto.link/public/20260629/mixed.avif'
  },

  // Specials & Samplers
  {
    id: 'special-bereka',
    name: 'Bunna Bereka',
    description: 'A traditional tasting experience including Jebena coffee, tea/coffee spris, and premium Arbegona filter pour-over.',
    price: 550,
    category: 'specials',
    isSpecialty: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'special-slam',
    name: 'Sidama Slam',
    description: 'High-end single-origin flight showcasing Hamasho (Natural), Arbegona (Washed), and Buncho (Honey) processed coffees.',
    price: 1000,
    category: 'specials',
    isSpecialty: true,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'special-buzz',
    name: 'Bunna Buzz',
    description: 'The ultimate caffeine trifecta featuring an Espresso shot, a classic Macchiato, and traditional Jebena coffee.',
    price: 400,
    category: 'specials',
    isSpecialty: true,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800'
  }
];

export const CAFE_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', label: 'Bole Sanctuary Main Space' },
  { url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200', label: 'Artisanal Wooden Slatted Lounge' },
  { url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200', label: 'Brewing Bar & Concrete Finish' },
  { url: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&q=80&w=1200', label: 'Outdoor Garden Terrace' },
  { url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200', label: 'Dukamo Gathering Corner' },
  { url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200', label: 'Cozy Workspace Seating' },
  { url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1200', label: 'Luminous bamboo design details' }
];

export const TASTING_NOTES = {
  Hamasho: {
    process: 'Natural',
    notes: 'Bergamot, jasmine, honey, apricot sweet finish.',
    altitude: '2,300m',
    region: 'Sidama, Arbegona'
  },
  Arbegona: {
    process: 'Washed',
    notes: 'Bright peach acidity, lemongrass, silky white tea mouthfeel.',
    altitude: '2,200m - 2,460m',
    region: 'Sidama, Arbegona'
  },
  Buncho: {
    process: 'Honey',
    notes: 'Creamy caramel, dark berries, candied orange peel.',
    altitude: '2,100m',
    region: 'Sidama, Buncho'
  }
};
