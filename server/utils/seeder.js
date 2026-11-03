import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import LabourJob from '../models/LabourJob.js';
import Application from '../models/Application.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';
import GroupBuy from '../models/GroupBuy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_agri_db';
    await mongoose.connect(mongoUri);
    console.log('\x1b[36mConnected to MongoDB for database seeding...\x1b[0m');

    // Clear existing collections
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await LabourJob.deleteMany();
    await Application.deleteMany();
    await Review.deleteMany();
    await Notification.deleteMany();
    await GroupBuy.deleteMany();

    console.log('Cleared existing collections.');

    // 1. Seed Demo Users with hashed passwords
    const users = await User.create([
      {
        name: 'Ramesh Patel',
        email: 'ramesh.patel@agrifarm.in',
        password: 'password123',
        role: 'farmer',
        phone: '+91 98231 44550',
        location: 'Nashik, Maharashtra',
        farmName: 'Green Valley Organics',
        farmSize: '12 Acres',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        verified: true,
        bio: 'Pioneering regenerative and drip-irrigated organic farming for over 18 years. Certified NPOP Organic cultivator.',
        crops: ['Tomatoes', 'Spinach', 'Bell Peppers', 'Sharbati Wheat']
      },
      {
        name: 'Suresh Kumar',
        email: 'suresh.kumar@sahyadrifarms.in',
        password: 'password123',
        role: 'farmer',
        phone: '+91 94220 88910',
        location: 'Pune, Maharashtra',
        farmName: 'Sahyadri Farms',
        farmSize: '25 Acres',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        verified: true,
        bio: 'Large-scale onion and potato producer using modern cold storage and sorting.',
        crops: ['Red Onions', 'Table Potatoes', 'Garlic']
      },
      {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        password: 'password123',
        role: 'customer',
        phone: '+91 99887 76655',
        location: 'Baner, Pune, Maharashtra',
        address: 'Flat 402, Green Meadows Apt, Baner, Pune 411045',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        name: 'Babu Rao Shinde',
        email: 'baburao.shinde@agriwork.in',
        password: 'password123',
        role: 'labour',
        phone: '+91 98555 43210',
        location: 'Nashik, Maharashtra',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        verified: true,
        skills: ['Harvesting', 'Ploughing', 'Drip Irrigation Setup', 'Tractor Driving'],
        experience: '7 Years',
        experienceYears: 7,
        dailyWage: 650,
        availability: 'Immediate',
        completedJobs: 48,
        rating: 4.9,
        bio: 'Experienced field supervisor and machinery operator. Quick and careful with perishable crop picking.'
      },
      {
        name: 'System Admin',
        email: 'admin@agrismart.gov.in',
        password: 'password123',
        role: 'admin',
        phone: '+91 1800 233 4567',
        location: 'Central AgriTech HQ, New Delhi',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        verified: true
      }
    ]);

    const farmerRamesh = users[0];
    const farmerSuresh = users[1];
    const customerAarav = users[2];
    const labourBabu = users[3];

    console.log(`Created ${users.length} demo users.`);

    // 2. Seed Produce Products
    const products = await Product.create([
      {
        name: 'Organic Hybrid Tomatoes',
        category: 'Vegetables',
        price: 30,
        unit: 'kg',
        quantity: 120,
        availableQuantity: 120,
        harvestDate: '2026-10-30',
        location: 'Nashik, Maharashtra',
        description: 'Farm-fresh vine-ripened organic tomatoes grown with zero chemical pesticides. Rich in Lycopene and naturally sweet.',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        farmer: farmerRamesh._id,
        farmerName: farmerRamesh.name,
        farmerLocation: farmerRamesh.location,
        distanceKm: 4.2,
        organic: true,
        grade: 'Grade A',
        status: 'Fresh Harvest',
        rating: 4.8,
        reviewsCount: 38,
        mandiPriceBenchmark: 28,
        priceHistory: [
          { date: 'Oct 25', price: 34 },
          { date: 'Oct 27', price: 32 },
          { date: 'Oct 29', price: 30 },
          { date: 'Oct 31', price: 30 }
        ]
      },
      {
        name: 'Fresh Red Onions',
        category: 'Vegetables',
        price: 35,
        unit: 'kg',
        quantity: 250,
        availableQuantity: 250,
        harvestDate: '2026-10-28',
        location: 'Pune, Maharashtra',
        description: 'High-pungency, sun-cured medium red onions with long shelf life. Ideal for everyday culinary needs.',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
        farmer: farmerSuresh._id,
        farmerName: farmerSuresh.name,
        farmerLocation: farmerSuresh.location,
        distanceKm: 7.5,
        organic: false,
        grade: 'Grade A',
        status: 'In Stock',
        rating: 4.6,
        reviewsCount: 42,
        mandiPriceBenchmark: 33,
        priceHistory: [
          { date: 'Oct 25', price: 38 },
          { date: 'Oct 27', price: 36 },
          { date: 'Oct 29', price: 35 },
          { date: 'Oct 31', price: 35 }
        ]
      },
      {
        name: 'Sharbati Golden Wheat Grain',
        category: 'Grains',
        price: 48,
        unit: 'kg',
        quantity: 500,
        availableQuantity: 500,
        harvestDate: '2026-10-20',
        location: 'Sehore, MP',
        description: 'Unpolished, naturally rain-fed MP Sharbati wheat. Yields soft, golden chapatis with natural nutty aroma.',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
        farmer: farmerRamesh._id,
        farmerName: farmerRamesh.name,
        farmerLocation: farmerRamesh.location,
        distanceKm: 15.0,
        organic: true,
        grade: 'Grade A+',
        status: 'In Stock',
        rating: 4.7,
        reviewsCount: 51,
        mandiPriceBenchmark: 46
      },
      {
        name: 'Fresh Baby Spinach (Palak)',
        category: 'Vegetables',
        price: 25,
        unit: 'bunch',
        quantity: 60,
        availableQuantity: 60,
        harvestDate: '2026-10-31',
        location: 'Nashik, Maharashtra',
        description: 'Tender, iron-rich hydroponic spinach leaves harvested at dawn. Ready to cook, pre-washed with ozonated water.',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
        farmer: farmerRamesh._id,
        farmerName: farmerRamesh.name,
        farmerLocation: farmerRamesh.location,
        distanceKm: 4.2,
        organic: true,
        grade: 'Grade A',
        status: 'Fresh Harvest',
        rating: 4.7,
        reviewsCount: 22
      },
      // Agri-Inputs
      {
        name: 'Bio-Neem Organic Pest Repellent (1 Litre)',
        category: 'Fertilizers',
        price: 450,
        unit: 'unit',
        quantity: 65,
        availableQuantity: 65,
        isAgriInput: true,
        brand: 'AgroShield Bio',
        rating: 4.8,
        reviewsCount: 84,
        image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop&q=80',
        description: 'Cold-pressed pure azadirachtin 1500 PPM formulation. Safe for beneficial bees and earthworms.',
        dosage: '5ml per litre of water',
        recommendedFor: ['Leaf Disease', 'Early Blight', 'Aphids', 'Whitefly'],
        farmer: farmerRamesh._id,
        farmerName: 'AgroShield Bio Store',
        farmerLocation: 'Agri Hub, Pune'
      },
      {
        name: 'Hybrid Disease-Resistant Tomato F1 Seeds (50g)',
        category: 'Seeds',
        price: 320,
        unit: 'unit',
        quantity: 90,
        availableQuantity: 90,
        isAgriInput: true,
        brand: 'Kaveri Hybrid Seeds',
        rating: 4.9,
        reviewsCount: 120,
        image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&auto=format&fit=crop&q=80',
        description: 'High germination rate (92%). Produces firm red fruit with thick skin suitable for distance transport.',
        dosage: '1 pack per 0.5 acre',
        recommendedFor: ['High Yield', 'Bacterial Wilt Resistance'],
        farmer: farmerRamesh._id,
        farmerName: 'Kaveri Hybrid Store',
        farmerLocation: 'Agri Hub, Pune'
      }
    ]);

    console.log(`Created ${products.length} products.`);

    // 3. Seed Sample Customer Order with tracking steps
    const order = await Order.create({
      customer: customerAarav._id,
      customerName: customerAarav.name,
      customerPhone: customerAarav.phone,
      deliveryAddress: customerAarav.address,
      items: [
        {
          product: products[0]._id,
          name: products[0].name,
          price: products[0].price,
          quantity: 3,
          unit: 'kg',
          image: products[0].image,
          farmer: farmerRamesh._id
        },
        {
          product: products[1]._id,
          name: products[1].name,
          price: products[1].price,
          quantity: 2,
          unit: 'kg',
          image: products[1].image,
          farmer: farmerSuresh._id
        }
      ],
      subtotal: 160,
      deliveryFee: 30,
      total: 190,
      paymentMethod: 'UPI / Online Paid',
      paymentStatus: 'Paid',
      orderStatus: 'Out for Delivery',
      trackingSteps: [
        { status: 'Placed', timestamp: '09:30 AM', done: true, desc: 'Order placed successfully by customer' },
        { status: 'Confirmed', timestamp: '09:45 AM', done: true, desc: 'Confirmed by Farmer Ramesh Patel' },
        { status: 'Preparing', timestamp: '10:30 AM', done: true, desc: 'Harvested & packed in aerated crates' },
        { status: 'Out for Delivery', timestamp: '11:45 AM', done: true, desc: 'With courier partner Rahul (+91 98111 22334)' },
        { status: 'Delivered', timestamp: 'Estimated in 30 mins', done: false, desc: 'Package arrives at your doorstep' }
      ]
    });

    console.log(`Created sample order #${order._id}`);

    // 4. Seed Labour Job
    await LabourJob.create({
      farmer: farmerRamesh._id,
      farmerName: farmerRamesh.name,
      title: 'Tomato Harvesting & Sorting Crew',
      location: 'Nashik (Farm Plot #14)',
      requiredSkill: 'Harvesting',
      workersNeeded: 6,
      workersApplied: 1,
      startDate: '2026-11-03',
      duration: '4 Days (8:00 AM - 4:30 PM)',
      dailyPayment: 650,
      perks: 'Tea, Refreshment & Lunch Provided',
      description: 'Urgent harvesting of 3 acres of organic hybrid tomatoes. Picking, crate loading, and field sorting.',
      status: 'Open'
    });

    // 5. Seed Group Buying Campaigns
    await GroupBuy.create([
      {
        productName: 'Farm-Fresh Tomatoes (Bulk Wholesale)',
        farmer: farmerRamesh._id,
        farmerName: farmerRamesh.name,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
        regularPrice: 30,
        groupPrice: 22,
        unit: 'kg',
        groupQuantityRequired: 50,
        currentDemandPledged: 35,
        remainingQuantity: 15,
        participantsCount: 8,
        endsInHours: 18,
        description: 'Team up with local neighborhood buyers to buy in bulk directly from the farmer and save 27%.'
      },
      {
        productName: 'Premium Red Onions Crate (40kg Pool)',
        farmer: farmerSuresh._id,
        farmerName: farmerSuresh.name,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80',
        regularPrice: 35,
        groupPrice: 27,
        unit: 'kg',
        groupQuantityRequired: 100,
        currentDemandPledged: 75,
        remainingQuantity: 25,
        participantsCount: 14,
        endsInHours: 24,
        description: 'Community collective purchase. Directly loaded from farm sorting shed.'
      }
    ]);

    // 6. Seed Sample Review
    await Review.create({
      product: products[0]._id,
      customer: customerAarav._id,
      customerName: customerAarav.name,
      rating: 5,
      comment: 'These organic tomatoes taste like real tomatoes from childhood! Sweet, fragrant and firm.',
      verified: true
    });

    // 7. Seed Sample Notifications
    await Notification.create([
      {
        recipient: farmerRamesh._id,
        roleTarget: 'farmer',
        type: 'new_order',
        title: 'New Customer Order Received!',
        message: 'Order for 3kg Organic Tomatoes received from Aarav Sharma.',
        link: '/farmer/orders'
      },
      {
        recipient: farmerRamesh._id,
        roleTarget: 'farmer',
        type: 'price_alert',
        title: 'AI Price Alert: Tomato Rates Rising',
        message: 'Local mandi arrivals dropped 14%. AI recommends price adjustment to ₹32/kg.',
        link: '/farmer/ai-price'
      },
      {
        recipient: customerAarav._id,
        roleTarget: 'customer',
        type: 'order_status',
        title: 'Order Out For Delivery',
        message: 'Your farm basket is out with delivery partner Rahul.',
        link: '/customer/orders'
      }
    ]);

    console.log('\x1b[32m✔ Seeding completed successfully!\x1b[0m');
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31mError during database seeding:\x1b[0m', error);
    process.exit(1);
  }
};

seedDatabase();

