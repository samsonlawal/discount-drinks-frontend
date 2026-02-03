'use strict';

/**
 * PRODUCT DATABASE
 * Centralized product data management
 * Version: 1.0.0
 * 
 * In production, this would be fetched from a backend API
 */

const ProductDatabase = (() => {
  
  // Product catalog
  const products = [
    {
      id: 'prod_001',
      name: 'Premium Red Wine',
      slug: 'premium-red-wine',
      price: 48.75,
      originalPrice: 65.00,
      discount: 25,
      category: 'Wine',
      subcategory: 'Red Wine',
      brand: 'Château Excellence',
      sku: 'WIN-RED-001',
      inStock: true,
      stockQuantity: 45,
      lowStockThreshold: 10,
      rating: 4.5,
      reviewCount: 128,
      images: [
        './assets/images/product-1.jpg',
        './assets/images/product-1-alt1.jpg',
        './assets/images/product-1-alt2.jpg',
        './assets/images/product-1-alt3.jpg'
      ],
      description: 'A refined and elegant red wine with rich notes of dark berries, oak, and subtle spice. Perfect for special occasions or pairing with red meats and aged cheeses.',
      longDescription: 'This exceptional red wine showcases the finest qualities of carefully selected grapes from our premier vineyards. Aged to perfection in French oak barrels, it develops a complex flavor profile that wine enthusiasts will appreciate. The wine exhibits a deep ruby color with aromas of blackcurrant, plum, and hints of vanilla. On the palate, it delivers a full-bodied experience with well-integrated tannins and a long, satisfying finish.',
      specifications: {
        'Volume': '750ml',
        'Alcohol Content': '13.5%',
        'Origin': 'Bordeaux, France',
        'Vintage': '2019',
        'Grape Variety': 'Cabernet Sauvignon, Merlot',
        'Serving Temperature': '16-18°C',
        'Aging Potential': '5-10 years'
      },
      features: [
        'Aged in French oak barrels for 18 months',
        'Award-winning vintage',
        'Complex flavor profile with notes of dark berries',
        'Pairs excellently with red meats and mature cheeses',
        'Elegant bottle design perfect for gifting'
      ],
      tags: ['wine', 'red-wine', 'premium', 'french', 'bordeaux'],
      relatedProducts: ['prod_002', 'prod_005', 'prod_010']
    },
    {
      id: 'prod_002',
      name: 'Classic White Wine',
      slug: 'classic-white-wine',
      price: 62.00,
      originalPrice: null,
      discount: 0,
      category: 'Wine',
      subcategory: 'White Wine',
      brand: 'Domaine Blanc',
      sku: 'WIN-WHT-002',
      inStock: true,
      stockQuantity: 32,
      lowStockThreshold: 10,
      rating: 4.7,
      reviewCount: 94,
      images: [
        './assets/images/product-2.jpg',
        './assets/images/product-2.jpg',
        './assets/images/product-2.jpg'
      ],
      description: 'A crisp and refreshing white wine with citrus notes and floral undertones. Ideal for seafood dishes and warm summer evenings.',
      longDescription: 'Experience the elegance of this classic white wine, crafted from premium Chardonnay grapes. This wine offers a perfect balance of acidity and fruitiness, with vibrant flavors of green apple, pear, and a hint of tropical fruit. The finish is clean and refreshing, making it an excellent choice for any occasion.',
      specifications: {
        'Volume': '750ml',
        'Alcohol Content': '12.5%',
        'Origin': 'Loire Valley, France',
        'Vintage': '2021',
        'Grape Variety': 'Chardonnay',
        'Serving Temperature': '8-10°C',
        'Aging Potential': '2-4 years'
      },
      features: [
        'Crisp and refreshing taste',
        'Perfect for seafood and light dishes',
        'Citrus and floral notes',
        'New arrival',
        'Sustainably produced'
      ],
      tags: ['wine', 'white-wine', 'chardonnay', 'french', 'new'],
      relatedProducts: ['prod_001', 'prod_006', 'prod_007']
    },
    {
      id: 'prod_003',
      name: 'Aged Whiskey',
      slug: 'aged-whiskey',
      price: 32.00,
      originalPrice: null,
      discount: 0,
      category: 'Spirits',
      subcategory: 'Whiskey',
      brand: 'Highland Reserve',
      sku: 'SPR-WHK-003',
      inStock: true,
      stockQuantity: 67,
      lowStockThreshold: 15,
      rating: 4.8,
      reviewCount: 203,
      images: [
        './assets/images/product-3.jpg',
        './assets/images/product-3.jpg',
        './assets/images/product-3.jpg'
      ],
      description: 'Smooth and rich aged whiskey with caramel and oak flavors. A perfect sipping whiskey for connoisseurs.',
      longDescription: 'This premium aged whiskey has been carefully matured for over 12 years in American oak casks. The result is a smooth, complex spirit with layers of flavor including vanilla, caramel, dried fruits, and a subtle smokiness. Each sip reveals new dimensions, making it a favorite among whiskey enthusiasts.',
      specifications: {
        'Volume': '700ml',
        'Alcohol Content': '40%',
        'Origin': 'Scotland',
        'Age': '12 Years',
        'Type': 'Single Malt',
        'Cask Type': 'American Oak',
        'Color': 'Deep Amber'
      },
      features: [
        'Aged for 12 years',
        'Smooth and complex flavor profile',
        'Notes of caramel, vanilla, and oak',
        'Award-winning distillery',
        'Premium gift packaging available'
      ],
      tags: ['spirits', 'whiskey', 'aged', 'scottish', 'single-malt'],
      relatedProducts: ['prod_004', 'prod_005', 'prod_009']
    },
    {
      id: 'prod_004',
      name: 'Smooth Dark Rum',
      slug: 'smooth-dark-rum',
      price: 84.00,
      originalPrice: null,
      discount: 0,
      category: 'Spirits',
      subcategory: 'Rum',
      brand: 'Caribbean Gold',
      sku: 'SPR-RUM-004',
      inStock: true,
      stockQuantity: 28,
      lowStockThreshold: 10,
      rating: 4.6,
      reviewCount: 156,
      images: [
        './assets/images/product-4.jpg',
        './assets/images/product-4.jpg',
        './assets/images/product-4.jpg'
      ],
      description: 'Rich and velvety dark rum with molasses sweetness and spice notes. Perfect for cocktails or neat sipping.',
      longDescription: 'Crafted in the heart of the Caribbean, this dark rum embodies centuries of tradition and expertise. Aged in charred oak barrels, it develops a rich mahogany color and complex flavor profile featuring notes of toffee, brown sugar, tropical fruits, and warm spices. Whether enjoyed neat, on the rocks, or in your favorite cocktail, this rum delivers an exceptional experience.',
      specifications: {
        'Volume': '750ml',
        'Alcohol Content': '40%',
        'Origin': 'Jamaica',
        'Age': '8 Years',
        'Type': 'Dark Rum',
        'Distillation': 'Pot Still',
        'Barrel': 'Charred Oak'
      },
      features: [
        'Aged 8 years in oak barrels',
        'Rich molasses and spice notes',
        'Versatile for cocktails or sipping',
        'Traditional Caribbean recipe',
        'Multiple award winner'
      ],
      tags: ['spirits', 'rum', 'dark-rum', 'caribbean', 'aged'],
      relatedProducts: ['prod_003', 'prod_006', 'prod_008']
    },
    {
      id: 'prod_005',
      name: 'Luxury Cognac',
      slug: 'luxury-cognac',
      price: 45.00,
      originalPrice: null,
      discount: 0,
      category: 'Spirits',
      subcategory: 'Cognac',
      brand: 'Maison Prestige',
      sku: 'SPR-COG-005',
      inStock: true,
      stockQuantity: 19,
      lowStockThreshold: 10,
      rating: 4.9,
      reviewCount: 87,
      images: [
        './assets/images/product-5.jpg',
        './assets/images/product-5.jpg',
        './assets/images/product-5.jpg'
      ],
      description: 'Exquisite cognac with complex fruit and floral notes. A sophisticated choice for special moments.',
      longDescription: 'This luxury cognac represents the pinnacle of French craftsmanship. Distilled from the finest eaux-de-vie and aged in Limousin oak casks, it offers an extraordinary tasting experience. The nose reveals aromas of dried apricot, jasmine, and hints of leather, while the palate delivers layers of candied fruit, vanilla, and subtle spice, culminating in an exceptionally long and elegant finish.',
      specifications: {
        'Volume': '700ml',
        'Alcohol Content': '40%',
        'Origin': 'Cognac, France',
        'Age': 'VSOP (Very Superior Old Pale)',
        'Grape Variety': 'Ugni Blanc',
        'Oak': 'Limousin',
        'Aging': 'Minimum 4 years'
      },
      features: [
        'VSOP grade cognac',
        'Complex fruit and floral bouquet',
        'Aged in French Limousin oak',
        'Elegant presentation bottle',
        'Perfect for gifting or collecting'
      ],
      tags: ['spirits', 'cognac', 'luxury', 'french', 'vsop'],
      relatedProducts: ['prod_001', 'prod_003', 'prod_010']
    },
    {
      id: 'prod_006',
      name: 'Premium Tequila',
      slug: 'premium-tequila',
      price: 30.00,
      originalPrice: 38.00,
      discount: 21,
      category: 'Spirits',
      subcategory: 'Tequila',
      brand: 'Agave Supreme',
      sku: 'SPR-TEQ-006',
      inStock: true,
      stockQuantity: 54,
      lowStockThreshold: 15,
      rating: 4.4,
      reviewCount: 142,
      images: [
        './assets/images/product-6.jpg',
        './assets/images/product-6.jpg',
        './assets/images/product-6.jpg'
      ],
      description: 'Smooth and authentic tequila with agave sweetness. Perfect for margaritas or shots.',
      longDescription: '100% blue agave tequila crafted using traditional methods in the highlands of Jalisco. This premium tequila undergoes a slow fermentation process and is double-distilled to achieve exceptional smoothness. The result is a crystal-clear spirit with pure agave flavor, subtle citrus notes, and a clean, crisp finish that makes it ideal for both sipping and mixing.',
      specifications: {
        'Volume': '750ml',
        'Alcohol Content': '40%',
        'Origin': 'Jalisco, Mexico',
        'Type': 'Blanco/Silver',
        'Agave': '100% Blue Agave',
        'Production': 'Traditional Methods',
        'NOM': '1579'
      },
      features: [
        '100% blue agave',
        'Traditional production methods',
        'Smooth and versatile',
        'Perfect for cocktails',
        'Award-winning distillery'
      ],
      tags: ['spirits', 'tequila', 'mexican', 'agave', 'discount'],
      relatedProducts: ['prod_004', 'prod_007', 'prod_008']
    },
    {
      id: 'prod_007',
      name: 'Fine Dry Gin',
      slug: 'fine-dry-gin',
      price: 25.00,
      originalPrice: 39.00,
      discount: 36,
      category: 'Spirits',
      subcategory: 'Gin',
      brand: 'Botanical Spirits Co.',
      sku: 'SPR-GIN-007',
      inStock: true,
      stockQuantity: 8,
      lowStockThreshold: 10,
      rating: 4.3,
      reviewCount: 98,
      images: [
        './assets/images/product-7.jpg',
        './assets/images/product-7.jpg',
        './assets/images/product-7.jpg'
      ],
      description: 'Classic London Dry Gin with juniper and citrus botanicals. Excellent for gin and tonics.',
      longDescription: 'A masterfully crafted London Dry Gin that honors traditional distilling methods while incorporating a unique blend of botanicals. The gin features a prominent juniper character balanced with bright citrus notes from lemon and orange peel, complemented by subtle hints of coriander, angelica root, and orris. The result is a versatile gin that shines in classic cocktails or simply with premium tonic water.',
      specifications: {
        'Volume': '700ml',
        'Alcohol Content': '42%',
        'Origin': 'London, England',
        'Style': 'London Dry',
        'Botanicals': '12 varieties',
        'Distillation': 'Copper Pot Still',
        'Water Source': 'Spring Water'
      },
      features: [
        'Classic London Dry style',
        '12 carefully selected botanicals',
        'Juniper-forward with citrus notes',
        'Low stock - limited availability',
        'Perfect for cocktails and G&Ts'
      ],
      tags: ['spirits', 'gin', 'london-dry', 'botanical', 'low-stock'],
      relatedProducts: ['prod_002', 'prod_006', 'prod_010']
    },
    {
      id: 'prod_008',
      name: 'Party Mix Combo',
      slug: 'party-mix-combo',
      price: 85.00,
      originalPrice: 99.00,
      discount: 14,
      category: 'Bundles',
      subcategory: 'Party Packs',
      brand: 'Discount Drinks',
      sku: 'BUN-PTY-008',
      inStock: true,
      stockQuantity: 23,
      lowStockThreshold: 5,
      rating: 4.7,
      reviewCount: 167,
      images: [
        './assets/images/product-8.jpg',
        './assets/images/product-8.jpg',
        './assets/images/product-8.jpg'
      ],
      description: 'Curated selection of spirits perfect for parties and gatherings. Great value bundle.',
      longDescription: 'The ultimate party solution! This carefully curated bundle includes a variety of premium spirits to cater to all tastes at your gathering. Contains vodka, rum, gin, and tequila - everything you need to create a full bar experience. Each bottle has been selected for its quality and versatility, ensuring your guests have plenty of options for their favorite cocktails. Save significantly compared to buying individually.',
      specifications: {
        'Total Volume': '3 Liters',
        'Number of Bottles': '4',
        'Contents': 'Vodka, Rum, Gin, Tequila',
        'Bottle Size': '750ml each',
        'Average ABV': '40%',
        'Packaging': 'Gift Box',
        'Servings': 'Approximately 80 drinks'
      },
      features: [
        'Four premium spirit bottles',
        'Perfect for parties of 15-20 people',
        'Significant savings vs individual purchase',
        'Gift-ready packaging',
        'Recipe card included'
      ],
      tags: ['bundle', 'party', 'spirits', 'value', 'gift'],
      relatedProducts: ['prod_003', 'prod_004', 'prod_006', 'prod_007']
    },
    {
      id: 'prod_009',
      name: 'Bulk Alcohol Pack',
      slug: 'bulk-alcohol-pack',
      price: 32.00,
      originalPrice: null,
      discount: 0,
      category: 'Bundles',
      subcategory: 'Bulk Deals',
      brand: 'Discount Drinks',
      sku: 'BUN-BLK-009',
      inStock: true,
      stockQuantity: 41,
      lowStockThreshold: 10,
      rating: 4.5,
      reviewCount: 213,
      images: [
        './assets/images/product-9.jpg',
        './assets/images/product-9.jpg',
        './assets/images/product-9.jpg'
      ],
      description: 'Economical bulk pack of assorted beverages. Best value for stocking up.',
      longDescription: 'Stock up and save with our Bulk Alcohol Pack! This value-focused bundle is perfect for those who like to keep their home bar well-stocked or for event planners looking for an economical solution. The pack includes a diverse selection of popular spirits and wines, ensuring variety while delivering exceptional value. Ideal for restaurants, bars, or home entertainers who need quality drinks at bulk pricing.',
      specifications: {
        'Total Volume': '4.5 Liters',
        'Number of Bottles': '6',
        'Variety': 'Mixed Spirits & Wines',
        'Average Bottle Size': '750ml',
        'Shelf Life': '2+ years',
        'Storage': 'Cool, dry place',
        'Servings': '120+ drinks'
      },
      features: [
        'Best value per liter',
        'Six bottle variety pack',
        'Popular brands included',
        'Perfect for stocking up',
        'Commercial quantities available'
      ],
      tags: ['bundle', 'bulk', 'value', 'mixed', 'wholesale'],
      relatedProducts: ['prod_008', 'prod_003', 'prod_001']
    },
    {
      id: 'prod_010',
      name: 'Creamy Liqueur',
      slug: 'creamy-liqueur',
      price: 71.00,
      originalPrice: null,
      discount: 0,
      category: 'Liqueurs',
      subcategory: 'Cream Liqueurs',
      brand: 'Velvet Dreams',
      sku: 'LIQ-CRM-010',
      inStock: true,
      stockQuantity: 36,
      lowStockThreshold: 10,
      rating: 4.6,
      reviewCount: 119,
      images: [
        './assets/images/product-10.jpg',
        './assets/images/product-10.jpg',
        './assets/images/product-10.jpg'
      ],
      description: 'Indulgent cream liqueur with rich chocolate and vanilla flavors. Perfect for dessert drinks.',
      longDescription: 'Experience pure indulgence with this luxurious cream liqueur. Crafted from the finest dairy cream blended with premium spirits and natural flavors, it delivers a velvety smooth texture and decadent taste. The flavor profile combines rich chocolate, vanilla bean, and subtle hints of caramel, creating a dessert-like experience in every sip. Enjoy it over ice, in coffee, or as a key ingredient in your favorite cream-based cocktails.',
      specifications: {
        'Volume': '750ml',
        'Alcohol Content': '17%',
        'Origin': 'Ireland',
        'Type': 'Cream Liqueur',
        'Ingredients': 'Cream, Spirits, Cocoa',
        'Shelf Life': '2 years (unopened)',
        'Storage': 'Refrigerate after opening'
      },
      features: [
        'New arrival',
        'Rich and creamy texture',
        'Chocolate and vanilla flavors',
        'Versatile for cocktails or desserts',
        'Beautiful gift bottle'
      ],
      tags: ['liqueur', 'cream', 'chocolate', 'dessert', 'new'],
      relatedProducts: ['prod_001', 'prod_002', 'prod_005']
    }
  ];

  /**
   * Get all products
   * @public
   */
  const getAllProducts = () => {
    return [...products];
  };

  /**
   * Get product by ID
   * @public
   */
  const getProductById = (id) => {
    return products.find(p => p.id === id) || null;
  };

  /**
   * Get product by slug
   * @public
   */
  const getProductBySlug = (slug) => {
    return products.find(p => p.slug === slug) || null;
  };

  /**
   * Get related products
   * @public
   */
  const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product || !product.relatedProducts) return [];
    
    return product.relatedProducts
      .map(id => getProductById(id))
      .filter(p => p !== null)
      .slice(0, limit);
  };

  /**
   * Check if product has low stock
   * @public
   */
  const hasLowStock = (productId) => {
    const product = getProductById(productId);
    if (!product) return false;
    
    return product.inStock && product.stockQuantity <= product.lowStockThreshold;
  };

  /**
   * Get products by category
   * @public
   */
  const getProductsByCategory = (category) => {
    return products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  };

  /**
   * Search products
   * @public
   */
  const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.includes(lowerQuery))
    );
  };

  return {
    getAllProducts,
    getProductById,
    getProductBySlug,
    getRelatedProducts,
    hasLowStock,
    getProductsByCategory,
    searchProducts
  };
})();

// Expose to global scope
window.ProductDatabase = ProductDatabase;