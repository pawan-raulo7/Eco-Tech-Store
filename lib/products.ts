'use client';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  recycledMaterial: string;
  co2Saved: string;
}

export const recycledProducts: Product[] = [
  {
    id: 1,
    name: 'Recycled Ocean Plastic Laptop Stand',
    price: 2899,
    originalPrice: 3499,
    category: 'Electronics',
    image: 'https://readdy.ai/api/search-image?query=Modern%20laptop%20stand%20made%20from%20recycled%20ocean%20plastic%2C%20sleek%20design%2C%20blue-tinted%20plastic%20material%20with%20visible%20recycled%20texture%2C%20adjustable%20ergonomic%20stand%2C%20eco-friendly%20technology%20accessory%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20sustainable%20computing&width=400&height=300&seq=product-1&orientation=landscape',
    description: 'Ergonomic laptop stand crafted from 100% recycled ocean plastic. Features adjustable height and angle for optimal viewing comfort while supporting marine conservation efforts.',
    features: ['100% Recycled Ocean Plastic', 'Adjustable Height & Angle', 'Anti-slip Base', 'Supports up to 15kg', 'Foldable Design'],
    rating: 4.8,
    reviews: 324,
    inStock: true,
    recycledMaterial: '2.5kg Ocean Plastic',
    co2Saved: '8.2kg CO2 equivalent'
  },
  {
    id: 2,
    name: 'Upcycled Tire Wireless Charging Pad',
    price: 1799,
    category: 'Electronics',
    image: 'https://readdy.ai/api/search-image?query=Wireless%20charging%20pad%20made%20from%20upcycled%20tire%20rubber%2C%20circular%20design%20with%20black%20recycled%20tire%20texture%2C%20modern%20minimalist%20aesthetic%2C%20smartphone%20charging%20wirelessly%2C%20sustainable%20technology%2C%20eco-friendly%20materials%20visible%2C%20clean%20background%2C%20professional%20lighting&width=400&height=300&seq=product-2&orientation=landscape',
    description: 'Fast wireless charging pad made from upcycled tire rubber. Provides 15W fast charging while giving new life to discarded tires.',
    features: ['15W Fast Charging', 'Upcycled Tire Rubber', 'Qi-Compatible', 'LED Charging Indicator', 'Non-slip Surface'],
    rating: 4.6,
    reviews: 189,
    inStock: true,
    recycledMaterial: '1 Tire Inner Tube',
    co2Saved: '3.5kg CO2 equivalent'
  },
  {
    id: 3,
    name: 'Recycled Steel Mesh Phone Holder',
    price: 1299,
    originalPrice: 1599,
    category: 'Accessories',
    image: 'https://readdy.ai/api/search-image?query=Phone%20holder%20made%20from%20recycled%20steel%20mesh%2C%20industrial%20modern%20design%2C%20metallic%20gray%20finish%20with%20visible%20mesh%20pattern%2C%20adjustable%20smartphone%20stand%2C%20sustainable%20desk%20accessory%2C%20minimalist%20design%2C%20clean%20white%20background%2C%20professional%20product%20shot&width=400&height=300&seq=product-3&orientation=landscape',
    description: 'Adjustable phone holder crafted from recycled steel mesh. Industrial design meets functionality with multiple viewing angles.',
    features: ['100% Recycled Steel', 'Adjustable Viewing Angles', 'Universal Phone Compatibility', 'Scratch-resistant Coating', 'Weighted Base'],
    rating: 4.7,
    reviews: 256,
    inStock: true,
    recycledMaterial: '0.8kg Steel',
    co2Saved: '2.1kg CO2 equivalent'
  },
  {
    id: 4,
    name: 'Reclaimed Wood Tablet Stand',
    price: 2299,
    category: 'Accessories',
    image: 'https://readdy.ai/api/search-image?query=Tablet%20stand%20made%20from%20reclaimed%20wood%2C%20natural%20wood%20grain%20visible%2C%20rustic%20modern%20design%2C%20wooden%20desk%20accessory%20holding%20tablet%2C%20sustainable%20materials%2C%20warm%20wood%20tones%2C%20eco-friendly%20craftsmanship%2C%20clean%20background%2C%20artisanal%20finish&width=400&height=300&seq=product-4&orientation=landscape',
    description: 'Handcrafted tablet stand made from reclaimed wood. Each piece is unique with natural wood grains and sustainable finishing.',
    features: ['Reclaimed Wood Construction', 'Hand-sanded Finish', 'Multiple Size Compatibility', 'Natural Wood Grain', 'Eco-friendly Coating'],
    rating: 4.9,
    reviews: 412,
    inStock: true,
    recycledMaterial: 'Reclaimed Hardwood',
    co2Saved: '5.8kg CO2 equivalent'
  },
  {
    id: 5,
    name: 'Recycled Aluminum Cable Organizer',
    price: 899,
    originalPrice: 1199,
    category: 'Storage',
    image: 'https://readdy.ai/api/search-image?query=Cable%20organizer%20made%20from%20recycled%20aluminum%2C%20sleek%20metallic%20finish%2C%20modern%20desk%20organization%20tool%2C%20multiple%20cable%20slots%2C%20sustainable%20office%20accessory%2C%20brushed%20aluminum%20texture%2C%20minimalist%20design%2C%20clean%20background%2C%20professional%20photography&width=400&height=300&seq=product-5&orientation=landscape',
    description: 'Keep your workspace tidy with this sleek cable organizer made from 100% recycled aluminum. Features multiple slots for different cable types.',
    features: ['100% Recycled Aluminum', '6 Cable Slots', 'Magnetic Base Option', 'Scratch Resistant', 'Lightweight Design'],
    rating: 4.5,
    reviews: 178,
    inStock: true,
    recycledMaterial: '0.3kg Aluminum',
    co2Saved: '1.8kg CO2 equivalent'
  },
  {
    id: 6,
    name: 'Upcycled Fabric Mouse Pad',
    price: 699,
    category: 'Accessories',
    image: 'https://readdy.ai/api/search-image?query=Mouse%20pad%20made%20from%20upcycled%20fabric%2C%20textured%20surface%20with%20visible%20fabric%20weave%2C%20colorful%20recycled%20textile%20pattern%2C%20desk%20accessory%20for%20computer%2C%20sustainable%20office%20supplies%2C%20soft%20fabric%20texture%2C%20eco-friendly%20materials%2C%20clean%20background&width=400&height=300&seq=product-6&orientation=landscape',
    description: 'Comfortable mouse pad made from upcycled fabric scraps. Provides smooth tracking while reducing textile waste.',
    features: ['Upcycled Fabric Surface', 'Non-slip Rubber Base', 'Machine Washable', 'Smooth Tracking', 'Colorfast Materials'],
    rating: 4.4,
    reviews: 234,
    inStock: true,
    recycledMaterial: 'Textile Scraps',
    co2Saved: '0.9kg CO2 equivalent'
  },
  {
    id: 7,
    name: 'Recycled Glass Monitor Stand',
    price: 3499,
    originalPrice: 4299,
    category: 'Electronics',
    image: 'https://readdy.ai/api/search-image?query=Monitor%20stand%20made%20from%20recycled%20glass%2C%20transparent%20thick%20glass%20construction%2C%20modern%20minimalist%20design%2C%20computer%20monitor%20elevated%20on%20glass%20stand%2C%20sustainable%20desk%20setup%2C%20crystal%20clear%20recycled%20glass%2C%20professional%20office%20furniture%2C%20clean%20background&width=400&height=300&seq=product-7&orientation=landscape',
    description: 'Elegant monitor stand crafted from recycled glass. Raises your monitor to eye level while adding a sophisticated touch to your workspace.',
    features: ['100% Recycled Glass', 'Tempered for Safety', 'Height Adjustment', 'Cable Management', 'Easy Assembly'],
    rating: 4.6,
    reviews: 167,
    inStock: true,
    recycledMaterial: '3.2kg Glass',
    co2Saved: '4.7kg CO2 equivalent'
  },
  {
    id: 8,
    name: 'Repurposed Cardboard Desk Organizer',
    price: 1199,
    category: 'Storage',
    image: 'https://readdy.ai/api/search-image?query=Desk%20organizer%20made%20from%20repurposed%20cardboard%2C%20kraft%20paper%20finish%2C%20multiple%20compartments%2C%20sustainable%20office%20organization%2C%20eco-friendly%20desk%20accessory%2C%20natural%20cardboard%20texture%2C%20modular%20design%2C%20clean%20workspace%20setup%2C%20environmentally%20conscious&width=400&height=300&seq=product-8&orientation=landscape',
    description: 'Multi-compartment desk organizer made from repurposed cardboard. Lightweight yet sturdy solution for office organization.',
    features: ['Repurposed Cardboard', '8 Compartments', 'Modular Design', 'Easy Assembly', 'Recyclable'],
    rating: 4.3,
    reviews: 289,
    inStock: true,
    recycledMaterial: 'Cardboard Waste',
    co2Saved: '2.3kg CO2 equivalent'
  },
  {
    id: 9,
    name: 'Recycled Plastic Keyboard Wrist Rest',
    price: 1599,
    category: 'Accessories',
    image: 'https://readdy.ai/api/search-image?query=Keyboard%20wrist%20rest%20made%20from%20recycled%20plastic%2C%20ergonomic%20design%2C%20soft-touch%20surface%2C%20computer%20desk%20accessory%2C%20sustainable%20office%20equipment%2C%20modern%20gray%20plastic%20with%20recycled%20texture%2C%20comfortable%20support%20pad%2C%20professional%20workspace&width=400&height=300&seq=product-9&orientation=landscape',
    description: 'Ergonomic wrist rest made from recycled plastic bottles. Provides comfortable support during long typing sessions.',
    features: ['Recycled Plastic Bottles', 'Memory Foam Core', 'Anti-bacterial Surface', 'Non-slip Base', 'Easy to Clean'],
    rating: 4.7,
    reviews: 345,
    inStock: false,
    recycledMaterial: '12 Plastic Bottles',
    co2Saved: '3.9kg CO2 equivalent'
  },
  {
    id: 10,
    name: 'Upcycled Skateboard Shelf',
    price: 2799,
    category: 'Storage',
    image: 'https://readdy.ai/api/search-image?query=Wall%20shelf%20made%20from%20upcycled%20skateboard%20deck%2C%20colorful%20skateboard%20graphics%20visible%2C%20mounted%20floating%20shelf%2C%20creative%20furniture%20piece%2C%20sustainable%20home%20decor%2C%20urban%20style%2C%20recycled%20skateboard%20art%2C%20modern%20wall%20storage%2C%20unique%20design&width=400&height=300&seq=product-10&orientation=landscape',
    description: 'Unique floating shelf made from upcycled skateboard decks. Each piece features original graphics and adds character to any room.',
    features: ['Upcycled Skateboard Deck', 'Original Graphics', 'Heavy-duty Brackets', 'Easy Installation', 'Unique Designs'],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    recycledMaterial: '1 Skateboard Deck',
    co2Saved: '1.4kg CO2 equivalent'
  },
  {
    id: 11,
    name: 'Recycled Newspaper Pencil Holder',
    price: 799,
    category: 'Storage',
    image: 'https://readdy.ai/api/search-image?query=Pencil%20holder%20made%20from%20recycled%20newspaper%2C%20woven%20paper%20texture%2C%20cylindrical%20container%2C%20eco-friendly%20desk%20organizer%2C%20newspaper%20print%20visible%2C%20sustainable%20office%20supplies%2C%20handcrafted%20appearance%2C%20natural%20materials%2C%20clean%20background&width=400&height=300&seq=product-11&orientation=landscape',
    description: 'Handwoven pencil holder made from recycled newspapers. A perfect blend of functionality and environmental consciousness.',
    features: ['100% Recycled Newspaper', 'Hand-woven Construction', 'Water-resistant Coating', 'Lightweight', 'Unique Pattern'],
    rating: 4.2,
    reviews: 198,
    inStock: true,
    recycledMaterial: 'Old Newspapers',
    co2Saved: '0.6kg CO2 equivalent'
  },
  {
    id: 12,
    name: 'Repurposed Vinyl Record Clock',
    price: 1899,
    originalPrice: 2299,
    category: 'Decor',
    image: 'https://readdy.ai/api/search-image?query=Wall%20clock%20made%20from%20repurposed%20vinyl%20record%2C%20black%20vinyl%20disc%20with%20clock%20hands%2C%20vintage%20music%20aesthetic%2C%20creative%20timepiece%2C%20sustainable%20home%20decor%2C%20upcycled%20music%20memorabilia%2C%20modern%20wall%20art%2C%20retro%20design&width=400&height=300&seq=product-12&orientation=landscape',
    description: 'Stylish wall clock created from repurposed vinyl records. Features silent movement and brings retro charm to any space.',
    features: ['Repurposed Vinyl Records', 'Silent Clock Movement', 'Battery Operated', 'Easy Hanging', 'Retro Aesthetic'],
    rating: 4.6,
    reviews: 287,
    inStock: true,
    recycledMaterial: '1 Vinyl Record',
    co2Saved: '1.1kg CO2 equivalent'
  }
];

export const categories = [
  'All',
  'Electronics',
  'Accessories', 
  'Storage',
  'Decor'
];

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return recycledProducts;
  return recycledProducts.filter(product => product.category === category);
}

export function getProductById(id: number): Product | undefined {
  return recycledProducts.find(product => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return recycledProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.recycledMaterial.toLowerCase().includes(lowercaseQuery)
  );
}