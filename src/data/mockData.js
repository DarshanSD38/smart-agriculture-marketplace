// Comprehensive mock data for AI-Powered Smart Agriculture Marketplace & Support System

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Organic Hybrid Tomatoes",
    category: "Vegetables",
    farmerId: "f-1",
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    distanceKm: 4.2,
    price: 30,
    unit: "kg",
    quantity: 120,
    availableQuantity: 120,
    harvestDate: "2026-10-30",
    status: "Fresh Harvest",
    rating: 4.8,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    description: "Farm-fresh vine-ripened organic tomatoes grown with zero chemical pesticides. Rich in Lycopene and naturally sweet.",
    source: "Green Valley Organics, Plot #14",
    organic: true,
    grade: "Grade A",
    mandiPriceBenchmark: 28,
    priceHistory: [
      { date: "Oct 25", price: 34 },
      { date: "Oct 27", price: 32 },
      { date: "Oct 29", price: 30 },
      { date: "Oct 31", price: 30 }
    ]
  },
  {
    id: "prod-2",
    name: "Fresh Red Onions",
    category: "Vegetables",
    farmerId: "f-2",
    farmerName: "Suresh Kumar",
    farmerLocation: "Pune, Maharashtra",
    distanceKm: 7.5,
    price: 35,
    unit: "kg",
    quantity: 250,
    availableQuantity: 250,
    harvestDate: "2026-10-28",
    status: "In Stock",
    rating: 4.6,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    description: "High-pungency, sun-cured medium red onions with long shelf life. Ideal for everyday culinary needs.",
    source: "Sahyadri Farms",
    organic: false,
    grade: "Grade A",
    mandiPriceBenchmark: 33,
    priceHistory: [
      { date: "Oct 25", price: 38 },
      { date: "Oct 27", price: 36 },
      { date: "Oct 29", price: 35 },
      { date: "Oct 31", price: 35 }
    ]
  },
  {
    id: "prod-3",
    name: "Kashmiri Honey Gala Apples",
    category: "Fruits",
    farmerId: "f-3",
    farmerName: "Gulzar Ahmad",
    farmerLocation: "Sopore, Kashmir",
    distanceKm: 12.0,
    price: 130,
    unit: "kg",
    quantity: 80,
    availableQuantity: 80,
    harvestDate: "2026-10-29",
    status: "Fresh Harvest",
    rating: 4.9,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
    description: "Crisp, hand-picked orchard fresh Kashmiri Gala apples. Hand-graded for sweetness, color, and crunch.",
    source: "Himalayan Foothill Orchards",
    organic: true,
    grade: "Export Quality",
    mandiPriceBenchmark: 140,
    priceHistory: [
      { date: "Oct 25", price: 145 },
      { date: "Oct 27", price: 135 },
      { date: "Oct 29", price: 130 },
      { date: "Oct 31", price: 130 }
    ]
  },
  {
    id: "prod-4",
    name: "Sharbati Golden Wheat Grain",
    category: "Grains",
    farmerId: "f-1",
    farmerName: "Ramesh Patel",
    farmerLocation: "Sehore, Madhya Pradesh",
    distanceKm: 15.0,
    price: 48,
    unit: "kg",
    quantity: 500,
    availableQuantity: 500,
    harvestDate: "2026-10-20",
    status: "In Stock",
    rating: 4.7,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    description: "Unpolished, naturally rain-fed MP Sharbati wheat. Yields soft, golden chapatis with natural nutty aroma.",
    source: "Narmada Basin Agro",
    organic: true,
    grade: "Grade A+",
    mandiPriceBenchmark: 46,
    priceHistory: [
      { date: "Oct 25", price: 47 },
      { date: "Oct 27", price: 48 },
      { date: "Oct 29", price: 48 },
      { date: "Oct 31", price: 48 }
    ]
  },
  {
    id: "prod-5",
    name: "Pure A2 Gir Cow Raw Milk",
    category: "Milk/Farm Products",
    farmerId: "f-4",
    farmerName: "Kavita Devi",
    farmerLocation: "Anand, Gujarat",
    distanceKm: 3.1,
    price: 68,
    unit: "litre",
    quantity: 45,
    availableQuantity: 45,
    harvestDate: "2026-10-31",
    status: "Fresh Harvest",
    rating: 4.95,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
    description: "Freshly chilled unpasteurized raw A2 milk from grass-fed indigenous Gir cows. Tested antibiotic and hormone free.",
    source: "Kamadhenu Gaushala & Dairy",
    organic: true,
    grade: "A2 Certified",
    mandiPriceBenchmark: 70,
    priceHistory: [
      { date: "Oct 25", price: 68 },
      { date: "Oct 27", price: 68 },
      { date: "Oct 29", price: 68 },
      { date: "Oct 31", price: 68 }
    ]
  },
  {
    id: "prod-6",
    name: "Fresh Baby Spinach (Palak)",
    category: "Vegetables",
    farmerId: "f-1",
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    distanceKm: 4.2,
    price: 25,
    unit: "bunch",
    quantity: 60,
    availableQuantity: 60,
    harvestDate: "2026-10-31",
    status: "Fresh Harvest",
    rating: 4.7,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
    description: "Tender, iron-rich hydroponic spinach leaves harvested at dawn. Ready to cook, pre-washed with ozonated water.",
    source: "Green Valley Organics",
    organic: true,
    grade: "Grade A",
    mandiPriceBenchmark: 24,
    priceHistory: [
      { date: "Oct 25", price: 26 },
      { date: "Oct 27", price: 25 },
      { date: "Oct 29", price: 25 },
      { date: "Oct 31", price: 25 }
    ]
  },
  {
    id: "prod-7",
    name: "Desi Table Potatoes (Jyoti)",
    category: "Vegetables",
    farmerId: "f-2",
    farmerName: "Suresh Kumar",
    farmerLocation: "Pune, Maharashtra",
    distanceKm: 7.5,
    price: 26,
    unit: "kg",
    quantity: 300,
    availableQuantity: 300,
    harvestDate: "2026-10-27",
    status: "In Stock",
    rating: 4.5,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    description: "Firm, low-sugar table potatoes suitable for steaming, roasting, and curries.",
    source: "Sahyadri Farms",
    organic: false,
    grade: "Grade A",
    mandiPriceBenchmark: 25,
    priceHistory: [
      { date: "Oct 25", price: 28 },
      { date: "Oct 27", price: 26 },
      { date: "Oct 29", price: 26 },
      { date: "Oct 31", price: 26 }
    ]
  },
  {
    id: "prod-8",
    name: "Fresh Alphonso Mangoes (Pre-Season)",
    category: "Fruits",
    farmerId: "f-5",
    farmerName: "Sunita Deshmukh",
    farmerLocation: "Ratnagiri, Maharashtra",
    distanceKm: 22.0,
    price: 320,
    unit: "dozen",
    quantity: 35,
    availableQuantity: 35,
    harvestDate: "2026-10-30",
    status: "Limited Stock",
    rating: 4.9,
    reviewsCount: 77,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
    description: "GI-tagged Ratnagiri Hapus mangoes. Naturally tree-ripened with hay, intense aroma and golden pulp.",
    source: "Kokana Heritage Groves",
    organic: true,
    grade: "Export Quality",
    mandiPriceBenchmark: 350,
    priceHistory: [
      { date: "Oct 25", price: 360 },
      { date: "Oct 27", price: 340 },
      { date: "Oct 29", price: 320 },
      { date: "Oct 31", price: 320 }
    ]
  }
];

export const INITIAL_FARMERS = [
  {
    id: "f-1",
    name: "Ramesh Patel",
    phone: "+91 98231 44550",
    email: "ramesh.patel@agrifarm.in",
    location: "Nashik, Maharashtra",
    district: "Nashik",
    state: "Maharashtra",
    farmName: "Green Valley Organics",
    farmSizeAcres: 12,
    rating: 4.8,
    reviewsCount: 145,
    verified: true,
    joinedDate: "March 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Pioneering regenerative and drip-irrigated organic farming for over 18 years. Certified NPOP Organic cultivator.",
    crops: ["Tomatoes", "Spinach", "Bell Peppers", "Sharbati Wheat"]
  },
  {
    id: "f-2",
    name: "Suresh Kumar",
    phone: "+91 94220 88910",
    email: "suresh.kumar@sahyadrifarms.in",
    location: "Pune, Maharashtra",
    district: "Pune",
    state: "Maharashtra",
    farmName: "Sahyadri Farms",
    farmSizeAcres: 25,
    rating: 4.6,
    reviewsCount: 98,
    verified: true,
    joinedDate: "January 2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Large-scale onion and potato producer using modern cold storage and precision sorting techniques.",
    crops: ["Red Onions", "Table Potatoes", "Garlic"]
  },
  {
    id: "f-3",
    name: "Gulzar Ahmad",
    phone: "+91 97970 12345",
    email: "gulzar.apples@kashmiragro.in",
    location: "Sopore, Kashmir",
    district: "Baramulla",
    state: "Jammu & Kashmir",
    farmName: "Himalayan Foothill Orchards",
    farmSizeAcres: 8,
    rating: 4.9,
    reviewsCount: 112,
    verified: true,
    joinedDate: "August 2023",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    bio: "3rd generation apple grower nestled in the Sopore valley. Cultivator of premium Kashmiri Gala and Delicious apples.",
    crops: ["Kashmiri Apples", "Walnuts", "Saffron"]
  },
  {
    id: "f-4",
    name: "Kavita Devi",
    phone: "+91 91234 56789",
    email: "kavita.devi@dairycoop.org",
    location: "Anand, Gujarat",
    district: "Anand",
    state: "Gujarat",
    farmName: "Kamadhenu Gaushala & Dairy",
    farmSizeAcres: 15,
    rating: 4.95,
    reviewsCount: 160,
    verified: true,
    joinedDate: "May 2023",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    bio: "Leading dairy entrepreneur managing 60+ indigenous Gir cows with automated hygienic milking and cold chain delivery.",
    crops: ["A2 Gir Cow Milk", "Cultured Ghee", "Organic Paneer"]
  }
];

export const INITIAL_LABOURERS = [
  {
    id: "l-1",
    name: "Babu Rao Shinde",
    phone: "+91 98555 43210",
    location: "Nashik, Maharashtra",
    district: "Nashik",
    experienceYears: 7,
    dailyWage: 650,
    skills: ["Harvesting", "Ploughing", "Drip Irrigation Setup", "Tractor Driving"],
    availability: "Immediate",
    rating: 4.9,
    completedJobs: 48,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    bio: "Experienced field supervisor and machinery operator. Quick and careful with perishable crop picking.",
    badge: "Top Rated"
  },
  {
    id: "l-2",
    name: "Sunil Yadav",
    phone: "+91 98444 32109",
    location: "Pune Rural, Maharashtra",
    district: "Pune",
    experienceYears: 5,
    dailyWage: 550,
    skills: ["Vegetable Sorting", "Weeding", "Sowing & Transplanting", "Pesticide Spraying"],
    availability: "Available Tomorrow",
    rating: 4.7,
    completedJobs: 32,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    bio: "Hardworking specialist in tomato and onion crop cycles. Certified in safe pesticide handling equipment.",
    badge: "Verified"
  },
  {
    id: "l-3",
    name: "Parvati Bai",
    phone: "+91 97333 21098",
    location: "Nashik East, Maharashtra",
    district: "Nashik",
    experienceYears: 9,
    dailyWage: 500,
    skills: ["Grading & Packaging", "Manual Weeding", "Fruit Picking", "Post-Harvest Handling"],
    availability: "Immediate",
    rating: 4.95,
    completedJobs: 64,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Leader of a dedicated 5-member women harvesting brigade. Exceptional speed and minimal crop damage.",
    badge: "Crew Leader"
  },
  {
    id: "l-4",
    name: "Karanjit Singh",
    phone: "+91 96222 10987",
    location: "Karnal, Haryana",
    district: "Karnal",
    experienceYears: 12,
    dailyWage: 800,
    skills: ["Harvester Operation", "Wheat Threshing", "Rotavator", "Soil Preparation"],
    availability: "Next Week",
    rating: 4.8,
    completedJobs: 71,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    bio: "Skilled agricultural equipment technician and heavy machinery operator for commercial grain fields.",
    badge: "Mechanized Expert"
  }
];

export const INITIAL_JOBS = [
  {
    id: "job-1",
    farmerId: "f-1",
    farmerName: "Ramesh Patel",
    title: "Tomato Harvesting & Sorting Crew",
    location: "Nashik (Farm Plot #14)",
    requiredSkill: "Harvesting",
    workersNeeded: 6,
    workersApplied: 4,
    startDate: "2026-11-03",
    duration: "4 Days (8:00 AM - 4:30 PM)",
    dailyPayment: 650,
    perks: "Tea, Refreshment & Lunch Provided",
    description: "Urgent harvesting of 3 acres of organic hybrid tomatoes. Picking, crate loading, and field sorting.",
    status: "Open"
  },
  {
    id: "job-2",
    farmerId: "f-2",
    farmerName: "Suresh Kumar",
    title: "Onion Sowing & Field Ridging",
    location: "Pune Rural (Near Chakan)",
    requiredSkill: "Sowing & Transplanting",
    workersNeeded: 8,
    workersApplied: 5,
    startDate: "2026-11-05",
    duration: "5 Days",
    dailyPayment: 600,
    perks: "Transportation pick-up from Chakan Bus Station",
    description: "Need skilled hands for onion seedling transplantation and furrow preparation.",
    status: "Open"
  },
  {
    id: "job-3",
    farmerId: "f-1",
    farmerName: "Ramesh Patel",
    title: "Drip Irrigation Pipe Maintenance",
    location: "Nashik",
    requiredSkill: "Drip Irrigation Setup",
    workersNeeded: 2,
    workersApplied: 2,
    startDate: "2026-11-02",
    duration: "2 Days",
    dailyPayment: 750,
    perks: "Daily travel allowance ₹100",
    description: "Flushing lateral drippers, replacing punctured filters and unclogging emitter nozzles.",
    status: "In Progress"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ord-1001",
    customerId: "c-1",
    customerName: "Aarav Sharma",
    customerPhone: "+91 99887 76655",
    deliveryAddress: "Flat 402, Green Meadows Apt, Baner, Pune 411045",
    date: "2026-10-31 09:30 AM",
    items: [
      { productId: "prod-1", name: "Organic Hybrid Tomatoes", price: 30, quantity: 3, unit: "kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&auto=format&fit=crop&q=80" },
      { productId: "prod-2", name: "Fresh Red Onions", price: 35, quantity: 2, unit: "kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=100&auto=format&fit=crop&q=80" }
    ],
    subtotal: 160,
    deliveryFee: 30,
    total: 190,
    paymentMethod: "UPI / Online Paid",
    paymentStatus: "Paid",
    orderStatus: "Out for Delivery", // Placed -> Confirmed -> Preparing -> Out for Delivery -> Delivered
    trackingSteps: [
      { status: "Placed", timestamp: "Oct 31, 09:30 AM", done: true, desc: "Order placed successfully by customer" },
      { status: "Confirmed", timestamp: "Oct 31, 09:45 AM", done: true, desc: "Confirmed by Farmer Ramesh Patel" },
      { status: "Preparing", timestamp: "Oct 31, 10:30 AM", done: true, desc: "Harvested & safely packed at farm" },
      { status: "Out for Delivery", timestamp: "Oct 31, 11:45 AM", done: true, desc: "With courier partner: Rahul (+91 98111 22334)" },
      { status: "Delivered", timestamp: "Estimated by 1:30 PM", done: false, desc: "Package arrives at your doorstep" }
    ]
  },
  {
    id: "ord-1002",
    customerId: "c-1",
    customerName: "Aarav Sharma",
    customerPhone: "+91 99887 76655",
    deliveryAddress: "Flat 402, Green Meadows Apt, Baner, Pune 411045",
    date: "2026-10-28 04:15 PM",
    items: [
      { productId: "prod-5", name: "Pure A2 Gir Cow Raw Milk", price: 68, quantity: 2, unit: "litre", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&auto=format&fit=crop&q=80" },
      { productId: "prod-6", name: "Fresh Baby Spinach (Palak)", price: 25, quantity: 2, unit: "bunch", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&auto=format&fit=crop&q=80" }
    ],
    subtotal: 186,
    deliveryFee: 30,
    total: 216,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid on Delivery",
    orderStatus: "Delivered",
    trackingSteps: [
      { status: "Placed", timestamp: "Oct 28, 04:15 PM", done: true, desc: "Order received" },
      { status: "Confirmed", timestamp: "Oct 28, 04:30 PM", done: true, desc: "Farmer accepted order" },
      { status: "Preparing", timestamp: "Oct 29, 06:00 AM", done: true, desc: "Chilled fresh milk collected" },
      { status: "Out for Delivery", timestamp: "Oct 29, 07:30 AM", done: true, desc: "Dispatched in insulated crate" },
      { status: "Delivered", timestamp: "Oct 29, 08:45 AM", done: true, desc: "Delivered to customer" }
    ]
  }
];

export const INITIAL_GROUP_BUYS = [
  {
    id: "gb-1",
    productName: "Farm-Fresh Tomatoes (Bulk Wholesale)",
    farmerName: "Ramesh Patel",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80",
    regularPrice: 30,
    groupPrice: 22,
    unit: "kg",
    groupQuantityRequired: 50,
    currentDemandPledged: 35,
    remainingQuantity: 15,
    participantsCount: 8,
    endsInHours: 18,
    description: "Team up with local neighborhood buyers to buy in bulk directly from the farmer and save 27%."
  },
  {
    id: "gb-2",
    productName: "Premium Red Onions Crate (40kg Pool)",
    farmerName: "Suresh Kumar",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80",
    regularPrice: 35,
    groupPrice: 27,
    unit: "kg",
    groupQuantityRequired: 100,
    currentDemandPledged: 75,
    remainingQuantity: 25,
    participantsCount: 14,
    endsInHours: 24,
    description: "Community collective purchase. Directly loaded from farm sorting shed."
  },
  {
    id: "gb-3",
    productName: "Kashmiri Honey Gala Apples (Carton Deal)",
    farmerName: "Gulzar Ahmad",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80",
    regularPrice: 130,
    groupPrice: 105,
    unit: "kg",
    groupQuantityRequired: 40,
    currentDemandPledged: 28,
    remainingQuantity: 12,
    participantsCount: 6,
    endsInHours: 36,
    description: "Export quality apple carton unlocked once minimum 40kg group order is pledged."
  }
];

export const INITIAL_AGRI_INPUTS = [
  {
    id: "inp-1",
    name: "Bio-Neem Organic Pest Repellent (1 Litre)",
    category: "Fertilizers",
    brand: "AgroShield Bio",
    price: 450,
    rating: 4.8,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop&q=80",
    stock: 65,
    recommendedFor: ["Leaf Disease", "Early Blight", "Aphids", "Whitefly"],
    description: "Cold-pressed pure azadirachtin 1500 PPM formulation. Safe for beneficial bees and earthworms.",
    dosage: "5ml per litre of water"
  },
  {
    id: "inp-2",
    name: "Hybrid Disease-Resistant Tomato F1 Seeds (50g)",
    category: "Seeds",
    brand: "Kaveri Hybrid Seeds",
    price: 320,
    rating: 4.9,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&auto=format&fit=crop&q=80",
    stock: 90,
    recommendedFor: ["High Yield", "Bacterial Wilt Resistance"],
    description: "High germination rate (92%). Produces firm red fruit with thick skin suitable for distance transport.",
    dosage: "1 pack per 0.5 acre"
  },
  {
    id: "inp-3",
    name: "Copper Oxychloride 50% WP Bio-Fungicide (500g)",
    category: "Fertilizers",
    brand: "Tata Rallis Agri",
    price: 285,
    rating: 4.7,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&auto=format&fit=crop&q=80",
    stock: 45,
    recommendedFor: ["Early Blight", "Late Blight", "Downy Mildew", "Leaf Spot"],
    description: "Broad spectrum preventative contact fungicide. Creates protective copper ion barrier on foliage.",
    dosage: "2.5g per litre"
  },
  {
    id: "inp-4",
    name: "Automatic Solar Drip Irrigation Controller Kit",
    category: "Irrigation Supplies",
    brand: "Jain Irrigation Systems",
    price: 4800,
    rating: 4.85,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&auto=format&fit=crop&q=80",
    stock: 12,
    recommendedFor: ["Water Conservation", "Drip Automation"],
    description: "Solar-powered timer and solenoid valve for timed watering cycles without relying on grid power.",
    dosage: "Covers up to 2 acres"
  },
  {
    id: "inp-5",
    name: "Heavy-Duty Battery Knapsack Sprayer (16L)",
    category: "Equipment",
    brand: "Neptune AgriTech",
    price: 2200,
    rating: 4.6,
    reviews: 79,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80",
    stock: 28,
    recommendedFor: ["Foliar Spraying", "Liquid Fertilizer"],
    description: "Rechargeable 12V 8Ah battery provides up to 6 hours continuous spraying with pressure regulator.",
    dosage: "1 unit"
  },
  {
    id: "inp-6",
    name: "Trichoderma Viride Bio-Fungicide Culture (1kg)",
    category: "Fertilizers",
    brand: "IFFCO Bio-Active",
    price: 190,
    rating: 4.75,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&auto=format&fit=crop&q=80",
    stock: 75,
    recommendedFor: ["Soil-borne Root Rot", "Damping-off"],
    description: "Natural antagonist fungus that defends crop roots against parasitic pathogens and enhances nutrient absorption.",
    dosage: "2kg per acre mixed with organic FYM"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "new_order",
    title: "New Customer Order Received!",
    message: "Order #ORD-1001 for 3kg Organic Tomatoes and 2kg Onions has been received.",
    timestamp: "10 mins ago",
    read: false,
    roleTarget: "farmer",
    link: "/farmer/orders"
  },
  {
    id: "notif-2",
    type: "price_alert",
    title: "AI Price Alert: Tomato Prices Expected to Rise",
    message: "Local mandi arrivals dropped 14%. AI predicts price surge from ₹30 to ₹34/kg next week.",
    timestamp: "1 hour ago",
    read: false,
    roleTarget: "farmer",
    link: "/farmer/ai-price"
  },
  {
    id: "notif-3",
    type: "surplus_alert",
    title: "Surplus Risk Warning: Spinach Stock",
    message: "Spinach inventory (60 bunches) has 24h shelf-life remaining. Recommended discount: 15%.",
    timestamp: "3 hours ago",
    read: true,
    roleTarget: "farmer",
    link: "/farmer/surplus"
  },
  {
    id: "notif-4",
    type: "job_alert",
    title: "Labourer Application Submitted",
    message: "Babu Rao Shinde applied for your job 'Tomato Harvesting & Sorting Crew'.",
    timestamp: "5 hours ago",
    read: true,
    roleTarget: "farmer",
    link: "/farmer/find-labour"
  },
  {
    id: "notif-5",
    type: "order_status",
    title: "Order Out For Delivery",
    message: "Your farm-fresh basket #ORD-1001 is on its way and will arrive shortly.",
    timestamp: "20 mins ago",
    read: false,
    roleTarget: "customer",
    link: "/customer/orders"
  },
  {
    id: "notif-6",
    type: "fresh_harvest",
    title: "Fresh Harvest Alert: Kashmiri Apples",
    message: "Farmer Gulzar Ahmad just harvested fresh Kashmiri Gala Apples in your area.",
    timestamp: "4 hours ago",
    read: true,
    roleTarget: "customer",
    link: "/marketplace"
  },
  {
    id: "notif-7",
    type: "crop_health_alert",
    title: "Crop Diagnosis Completed",
    message: "AI analysis of your Tomato leaf sample identified Early Blight (87% confidence).",
    timestamp: "Yesterday",
    read: true,
    roleTarget: "farmer",
    link: "/farmer/crop-health"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    productId: "prod-1",
    customerName: "Pooja Varma",
    rating: 5,
    date: "2026-10-29",
    verified: true,
    comment: "These organic tomatoes taste like real tomatoes from childhood! Beautiful color, sweet tanginess and firm texture."
  },
  {
    id: "rev-2",
    productId: "prod-1",
    customerName: "Vikram Sen",
    rating: 4,
    date: "2026-10-27",
    verified: true,
    comment: "Arrived fresh and cool in eco-friendly packaging. Highly recommended directly from farmer Ramesh."
  },
  {
    id: "rev-3",
    productId: "prod-5",
    customerName: "Meera Joshi",
    rating: 5,
    date: "2026-10-30",
    verified: true,
    comment: "The A2 raw milk has thick malai and sweet taste. Our kids love it. We ordered a recurring morning subscription!"
  }
];

export const INITIAL_ADMIN_STATS = {
  totalFarmers: 428,
  totalCustomers: 3890,
  totalLabourers: 312,
  totalProducts: 1420,
  totalOrders: 9480,
  totalSalesGmv: 4250000,
  activeJobs: 86,
  reportedComplaints: 3,
  systemUptime: "99.98%"
};

export const INITIAL_PRICE_COMPARISONS = {
  "Tomato": [
    {
      farmerId: "f-1",
      farmerName: "Ramesh Patel",
      farm: "Green Valley Organics",
      price: 30,
      unit: "kg",
      distanceKm: 4.2,
      rating: 4.8,
      harvestDate: "Oct 30 (Today)",
      certifiedOrganic: true,
      badge: "Highest Rated"
    },
    {
      farmerId: "f-2",
      farmerName: "Suresh Kumar",
      farm: "Sahyadri Agro",
      price: 28,
      unit: "kg",
      distanceKm: 7.5,
      rating: 4.6,
      harvestDate: "Oct 29 (Yesterday)",
      certifiedOrganic: false,
      badge: "Best Value"
    },
    {
      farmerId: "f-6",
      farmerName: "Anand Shewale",
      farm: "Dindori Farms",
      price: 32,
      unit: "kg",
      distanceKm: 1.8,
      rating: 4.9,
      harvestDate: "Oct 30 (Morning)",
      certifiedOrganic: true,
      badge: "Nearest Farm"
    }
  ],
  "Potato": [
    {
      farmerId: "f-2",
      farmerName: "Suresh Kumar",
      farm: "Sahyadri Farms",
      price: 26,
      unit: "kg",
      distanceKm: 7.5,
      rating: 4.5,
      harvestDate: "Oct 27",
      certifiedOrganic: false,
      badge: "Best Value"
    },
    {
      farmerId: "f-7",
      farmerName: "Bhimrao Patil",
      farm: "Satara Gold",
      price: 29,
      unit: "kg",
      distanceKm: 5.2,
      rating: 4.7,
      harvestDate: "Oct 28",
      certifiedOrganic: true,
      badge: "Organic Certified"
    }
  ],
  "Onion": [
    {
      farmerId: "f-2",
      farmerName: "Suresh Kumar",
      farm: "Sahyadri Farms",
      price: 35,
      unit: "kg",
      distanceKm: 7.5,
      rating: 4.6,
      harvestDate: "Oct 28",
      certifiedOrganic: false,
      badge: "Best Value"
    },
    {
      farmerId: "f-8",
      farmerName: "Chhagan Bhujbal",
      farm: "Lasalgaon Direct",
      price: 38,
      unit: "kg",
      distanceKm: 9.1,
      rating: 4.8,
      harvestDate: "Oct 29",
      certifiedOrganic: true,
      badge: "Premium Grade"
    }
  ]
};

