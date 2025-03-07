import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');
  
  // Create users: admin and regular users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  
  console.log('Creating users...');
  await prisma.user.upsert({
    where: { email: 'admin@1moregame.com' },
    update: {},
    create: {
      email: 'admin@1moregame.com',
      password: adminPassword,
      name: 'Admin User',
      emailVerified: true,
      role: 'ADMIN',
      avatar: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/admin-avatar.png',
      phoneNumber: '+2348012345678',
      country: 'Nigeria',
      loyaltyPoints: 500,
      referralCode: 'ADMIN123',
    },
  });
  
  const user1 = await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      email: 'johndoe@example.com',
      password: userPassword,
      name: 'John Doe',
      emailVerified: true,
      role: 'USER',
      avatar: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/user1-avatar.png',
      phoneNumber: '+2347012345678',
      country: 'Nigeria',
      loyaltyPoints: 150,
      referralCode: 'JOHN123',
    },
  });
  
  const user2 = await prisma.user.upsert({
    where: { email: 'janesmith@example.com' },
    update: {},
    create: {
      email: 'janesmith@example.com',
      password: userPassword,
      name: 'Jane Smith',
      emailVerified: true,
      role: 'USER',
      avatar: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/user2-avatar.png',
      phoneNumber: '+2547012345678',
      country: 'Kenya',
      loyaltyPoints: 220,
      referralCode: 'JANE123',
      referredBy: 'JOHN123',
    },
  });
  
  console.log('Creating categories...');
  // Create categories
  const giftCardsCategory = await prisma.category.upsert({
    where: { slug: 'gift-cards' },
    update: {},
    create: {
      name: 'Gift Cards',
      slug: 'gift-cards',
      description: 'Digital gift cards for popular gaming platforms',
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/categories/gift-cards.png',
      isActive: true,
    },
  });
  
  const gameCurrencyCategory = await prisma.category.upsert({
    where: { slug: 'game-currency' },
    update: {},
    create: {
      name: 'Game Currency',
      slug: 'game-currency',
      description: 'In-game currencies for popular games',
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/categories/game-currency.png',
      isActive: true,
    },
  });
  
  const subscriptionsCategory = await prisma.category.upsert({
    where: { slug: 'subscriptions' },
    update: {},
    create: {
      name: 'Subscriptions',
      slug: 'subscriptions',
      description: 'Gaming subscriptions and memberships',
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/categories/subscriptions.png',
      isActive: true,
    },
  });
  
  // Create subcategories
  const playstationCategory = await prisma.category.upsert({
    where: { slug: 'playstation' },
    update: {},
    create: {
      name: 'PlayStation',
      slug: 'playstation',
      description: 'PlayStation gift cards and subscriptions',
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/categories/playstation.png',
      isActive: true,
      parentId: giftCardsCategory.id,
    },
  });
  
  const xboxCategory = await prisma.category.upsert({
    where: { slug: 'xbox' },
    update: {},
    create: {
      name: 'Xbox',
      slug: 'xbox',
      description: 'Xbox gift cards and subscriptions',
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/categories/xbox.png',
      isActive: true,
      parentId: giftCardsCategory.id,
    },
  });
  
  const steamCategory = await prisma.category.upsert({
    where: { slug: 'steam' },
    update: {},
    create: {
      name: 'Steam',
      slug: 'steam',
      description: 'Steam gift cards and wallet codes',
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/categories/steam.png',
      isActive: true,
      parentId: giftCardsCategory.id,
    },
  });
  
  const mobileGamesCategory = await prisma.category.upsert({
    where: { slug: 'mobile-games' },
    update: {},
    create: {
      name: 'Mobile Games',
      slug: 'mobile-games',
      description: 'Currency for popular mobile games',
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/categories/mobile-games.png',
      isActive: true,
      parentId: gameCurrencyCategory.id,
    },
  });
  
  console.log('Creating promotions...');
  // Create promotions
  const summersalePromotion = await prisma.promotion.upsert({
    where: { code: 'SUMMER2023' },
    update: {},
    create: {
      name: 'Summer Sale 2023',
      description: 'Get 10% off on selected items',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      code: 'SUMMER2023',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-08-31'),
      isActive: true,
    },
  });
  
    await prisma.promotion.upsert({
    where: { code: 'NEWUSER2023' },
    update: {},
    create: {
      name: 'New User Special',
      description: 'Get 15% off on your first purchase',
      discountType: 'PERCENTAGE',
      discountValue: 15,
      code: 'NEWUSER2023',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: true,
    },
  });
  
  const bundlePromotion = await prisma.promotion.upsert({
    where: { code: 'BUNDLE2023' },
    update: {},
    create: {
      name: 'Bundle Discount',
      description: 'Buy 2 or more items and get a special discount',
      discountType: 'BUNDLE',
      discountValue: 20,
      code: 'BUNDLE2023',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: true,
    },
  });
  
  console.log('Creating products...');
  // Create products
  const products = [
    // PlayStation Products
    {
      name: 'PlayStation Network Card $10',
      slug: 'playstation-network-card-10',
      description: 'Add $10 to your PlayStation Network wallet. Use to purchase games, DLCs, and more from the PlayStation Store.',
      price: 10.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/psn-10.png',
      stock: 100,
      isActive: true,
      isFeatured: true,
      sku: 'PSN-10',
      categoryId: playstationCategory.id,
      tags: ['playstation', 'gift card', 'digital'],
      regionCodes: ['global'],
    },
    {
      name: 'PlayStation Network Card $20',
      slug: 'playstation-network-card-20',
      description: 'Add $20 to your PlayStation Network wallet. Use to purchase games, DLCs, and more from the PlayStation Store.',
      price: 20.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/psn-20.png',
      stock: 100,
      isActive: true,
      isFeatured: false,
      sku: 'PSN-20',
      categoryId: playstationCategory.id,
      tags: ['playstation', 'gift card', 'digital'],
      regionCodes: ['global'],
    },
    {
      name: 'PlayStation Plus 1 Month',
      slug: 'playstation-plus-1-month',
      description: 'Get 1 month of PlayStation Plus. Enjoy online multiplayer, free monthly games, and exclusive discounts.',
      price: 9.99,
      salePrice: 8.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/ps-plus-1.png',
      stock: 100,
      isActive: true,
      isFeatured: true,
      sku: 'PS-PLUS-1',
      categoryId: subscriptionsCategory.id,
      tags: ['playstation', 'subscription', 'digital'],
      regionCodes: ['global'],
    },
    
    // Xbox Products
    {
      name: 'Xbox Gift Card $10',
      slug: 'xbox-gift-card-10',
      description: 'Add $10 to your Microsoft account. Use to purchase games, DLCs, and more from the Xbox Store.',
      price: 10.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/xbox-10.png',
      stock: 100,
      isActive: true,
      isFeatured: false,
      sku: 'XBOX-10',
      categoryId: xboxCategory.id,
      tags: ['xbox', 'gift card', 'digital'],
      regionCodes: ['global'],
    },
    {
      name: 'Xbox Game Pass Ultimate 1 Month',
      slug: 'xbox-game-pass-ultimate-1-month',
      description: 'Get 1 month of Xbox Game Pass Ultimate. Access over 100 high-quality games on Xbox and PC, plus Xbox Live Gold.',
      price: 14.99,
      salePrice: 12.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/gamepass-1.png',
      stock: 100,
      isActive: true,
      isFeatured: true,
      sku: 'GAMEPASS-1',
      categoryId: subscriptionsCategory.id,
      tags: ['xbox', 'subscription', 'digital'],
      regionCodes: ['global'],
    },
    
    // Steam Products
    {
      name: 'Steam Wallet Code $20',
      slug: 'steam-wallet-code-20',
      description: 'Add $20 to your Steam wallet. Use to purchase games, DLCs, and more from the Steam Store.',
      price: 20.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/steam-20.png',
      stock: 100,
      isActive: true,
      isFeatured: true,
      sku: 'STEAM-20',
      categoryId: steamCategory.id,
      tags: ['steam', 'gift card', 'digital'],
      regionCodes: ['global'],
    },
    
    // Mobile Game Products
    {
      name: 'Free Fire 100 Diamonds',
      slug: 'free-fire-100-diamonds',
      description: 'Get 100 diamonds for Free Fire. Use to purchase in-game items, characters, and more.',
      price: 1.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/ff-100.png',
      stock: 100,
      isActive: true,
      isFeatured: true,
      sku: 'FF-100',
      categoryId: mobileGamesCategory.id,
      tags: ['free fire', 'mobile', 'game currency'],
      regionCodes: ['global', 'africa'],
    },
    {
      name: 'PUBG Mobile 60 UC',
      slug: 'pubg-mobile-60-uc',
      description: 'Get 60 Unknown Cash for PUBG Mobile. Use to purchase in-game items, outfits, and more.',
      price: 0.99,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/pubg-60.png',
      stock: 100,
      isActive: true,
      isFeatured: false,
      sku: 'PUBG-60',
      categoryId: mobileGamesCategory.id,
      tags: ['pubg', 'mobile', 'game currency'],
      regionCodes: ['global', 'africa'],
    },
    {
      name: 'Mobile Legends 100 Diamonds',
      slug: 'mobile-legends-100-diamonds',
      description: 'Get 100 diamonds for Mobile Legends. Use to purchase heroes, skins, and more.',
      price: 1.99,
      salePrice: 1.79,
      image: 'https://res.cloudinary.com/dqkcouko3/image/upload/v1614178687/1moregame/products/ml-100.png',
      stock: 100,
      isActive: true,
      isFeatured: true,
      sku: 'ML-100',
      categoryId: mobileGamesCategory.id,
      tags: ['mobile legends', 'mobile', 'game currency'],
      regionCodes: ['global', 'africa'],
    },
  ];
  
  // Insert products
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  
  // Link products to promotions
  console.log('Linking products to promotions...');
  
  // Get all products
  const allProducts = await prisma.product.findMany();
  
  // Summer sale promotion for gift cards
  const giftCardProducts = allProducts.filter(p => 
    p.categoryId === playstationCategory.id || 
    p.categoryId === xboxCategory.id || 
    p.categoryId === steamCategory.id
  );
  
  for (const product of giftCardProducts) {
    await prisma.productPromotion.upsert({
      where: { 
        productId_promotionId: {
          productId: product.id,
          promotionId: summersalePromotion.id
        }
      },
      update: {},
      create: {
        productId: product.id,
        promotionId: summersalePromotion.id,
      },
    });
  }
  
  // Bundle promotion for all products
  for (const product of allProducts) {
    await prisma.productPromotion.upsert({
      where: { 
        productId_promotionId: {
          productId: product.id,
          promotionId: bundlePromotion.id
        }
      },
      update: {},
      create: {
        productId: product.id,
        promotionId: bundlePromotion.id,
      },
    });
  }
  
  console.log('Creating sample orders...');
  // Create sample orders
  const order1 = await prisma.order.upsert({
    where: { id: 'clq123456789' },
    update: {},
    create: {
      id: 'clq123456789',
      userId: user1.id,
      status: 'COMPLETED',
      total: 32.97,
      createdAt: new Date('2023-05-15'),
      updatedAt: new Date('2023-05-15'),
    },
  });
  
  // Add order items
  await prisma.orderItem.upsert({
    where: { id: 'clq987654321' },
    update: {},
    create: {
      id: 'clq987654321',
      orderId: order1.id,
      productId: allProducts.find(p => p.slug === 'playstation-network-card-10')!.id,
      quantity: 3,
      price: 10.99,
    },
  });
  
  const order2 = await prisma.order.upsert({
    where: { id: 'clq123456790' },
    update: {},
    create: {
      id: 'clq123456790',
      userId: user2.id,
      status: 'COMPLETED',
      total: 14.99,
      createdAt: new Date('2023-06-20'),
      updatedAt: new Date('2023-06-20'),
    },
  });
  
  await prisma.orderItem.upsert({
    where: { id: 'clq987654322' },
    update: {},
    create: {
      id: 'clq987654322',
      orderId: order2.id,
      productId: allProducts.find(p => p.slug === 'xbox-game-pass-ultimate-1-month')!.id,
      quantity: 1,
      price: 14.99,
    },
  });
  
  console.log('Creating reviews...');
  // Create reviews
  const reviews = [
    {
      id: 'clq123456791',
      userId: user1.id,
      productId: allProducts.find(p => p.slug === 'playstation-network-card-10')!.id,
      rating: 5,
      comment: 'Great service! The code was delivered instantly, and it worked perfectly.',
      createdAt: new Date('2023-05-16'),
    },
    {
      id: 'clq123456792',
      userId: user2.id,
      productId: allProducts.find(p => p.slug === 'xbox-game-pass-ultimate-1-month')!.id,
      rating: 4,
      comment: 'Good value for money. The code worked fine, but the email took a few minutes to arrive.',
      createdAt: new Date('2023-06-21'),
    },
    {
      id: 'clq123456793',
      userId: user1.id,
      productId: allProducts.find(p => p.slug === 'free-fire-100-diamonds')!.id,
      rating: 5,
      comment: 'Fast delivery and easy to redeem. Will buy again!',
      createdAt: new Date('2023-05-20'),
    },
  ];
  
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
  
  console.log('Creating notifications...');
  // Create notifications
  await prisma.notification.upsert({
    where: { id: 'clq123456794' },
    update: {},
    create: {
      id: 'clq123456794',
      userId: user1.id,
      type: 'ORDER',
      title: 'Order Completed',
      message: 'Your order #ORD-001 has been completed. Thank you for shopping with us!',
      read: true,
      createdAt: new Date('2023-05-15'),
    },
  });
  
  await prisma.notification.upsert({
    where: { id: 'clq123456795' },
    update: {},
    create: {
      id: 'clq123456795',
      userId: user1.id,
      type: 'PROMOTION',
      title: 'New Promotion Available',
      message: 'Check out our Summer Sale 2023! Get 10% off on selected items.',
      read: false,
      createdAt: new Date('2023-06-01'),
    },
  });
  
  await prisma.notification.upsert({
    where: { id: 'clq123456796' },
    update: {},
    create: {
      id: 'clq123456796',
      userId: user2.id,
      type: 'ORDER',
      title: 'Order Completed',
      message: 'Your order #ORD-002 has been completed. Thank you for shopping with us!',
      read: true,
      createdAt: new Date('2023-06-20'),
    },
  });
  
  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 