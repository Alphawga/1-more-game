'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductSection from '@/components/ProductSection';
import PromoSection from '@/components/PromoSection';
import FeatureSection from '@/components/FeatureSection';
import { useTheme } from '@/components/ThemeProvider';

// Function to generate placeholder URLs
const placeholderImage = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

// Sample data
const popularGameCards = [
  {
    id: '1',
    name: 'PlayStation Network Card (HK)',
    image: placeholderImage('PSN'),
    region: 'Hong Kong',
    href: '/product/psn-hk',
  },
  {
    id: '2',
    name: 'Free Fire Diamonds Pins (Garena)',
    image: placeholderImage('FF'),
    region: 'Global',
    href: '/product/freefire-pins',
  },
  {
    id: '3',
    name: 'PUBG Mobile UC Redeem Code',
    image: placeholderImage('PUBG'),
    region: 'Global',
    href: '/product/pubgm-uc',
  },
  {
    id: '4',
    name: 'Cherry Credits CC',
    image: placeholderImage('CC'),
    region: 'Global',
    href: '/product/cherry-credits',
  },
  {
    id: '5',
    name: 'iTunes Gift Card (US)',
    image: placeholderImage('iTunes'),
    region: 'United States',
    href: '/product/itunes-us',
  },
  {
    id: '6',
    name: 'iTunes Gift Card (CN)',
    image: placeholderImage('iTunes'),
    region: 'China',
    href: '/product/itunes-cn',
  },
  {
    id: '7',
    name: 'MyCard (TW)',
    image: placeholderImage('MyCard'),
    region: 'Taiwan',
    href: '/product/mycard-tw',
  },
  {
    id: '8',
    name: 'iTunes Gift Card (JP)',
    image: placeholderImage('iTunes'),
    region: 'Japan',
    href: '/product/itunes-jp',
  },
];

const popularGameTopUps = [
  {
    id: '1',
    name: 'PUBG Mobile UC',
    image: placeholderImage('PUBG'),
    region: 'Global',
    href: '/product/pubgm-uc-topup',
  },
  {
    id: '2',
    name: 'Mobile Legends Diamonds',
    image: placeholderImage('ML'),
    region: 'Global',
    href: '/product/mlbb-diamonds',
  },
  {
    id: '3',
    name: 'Age of Empires Mobile Top Up',
    image: placeholderImage('AOE'),
    region: 'Global',
    href: '/product/aoe-topup',
  },
  {
    id: '4',
    name: 'Honor of Kings Tokens & Package',
    image: placeholderImage('HOK'),
    region: 'Global',
    href: '/product/hok-tokens',
  },
  {
    id: '5',
    name: 'TikTok China Diamonds (Douyin)',
    image: placeholderImage('TT'),
    region: 'China',
    href: '/product/tiktok-diamonds',
  },
  {
    id: '6',
    name: 'Marvel Rivals Top Up',
    image: placeholderImage('MR'),
    region: 'Global',
    href: '/product/marvel-rivals',
  },
  {
    id: '7',
    name: 'Identity V Echoes',
    image: placeholderImage('IDV'),
    region: 'Global',
    href: '/product/identity-v',
  },
  {
    id: '8',
    name: 'BIGO Live Diamonds',
    image: placeholderImage('BIGO'),
    region: 'Global',
    href: '/product/bigo-diamonds',
  },
];

const exclusiveOffers = [
  {
    id: '1',
    name: '1080 Diamonds Free Fire Diamonds',
    subtext: 'Free Fire Diamonds',
    image: placeholderImage('FF'),
    discount: '-5.0%',
    href: '/promo/freefire-1080',
  },
  {
    id: '2',
    name: '10000 Paid Cube G Jujutsu Kaisen Phantom Parade Top Up',
    subtext: 'Jujutsu Kaisen',
    image: placeholderImage('JK'),
    discount: '-5.0%',
    href: '/promo/jujutsu-10000',
  },
  {
    id: '3',
    name: '9999 + 400 Red Diamonds Hero Clash Red Diamonds',
    subtext: 'Hero Clash',
    image: placeholderImage('HC'),
    discount: '-10.0%',
    href: '/promo/hero-clash-9999',
  },
  {
    id: '4',
    name: 'iTunes Gift Card 3 EURO PT iTunes Gift Card (PT)',
    subtext: 'iTunes Gift Card (PT)',
    image: placeholderImage('iTunes'),
    discount: '-3.0%',
    href: '/promo/itunes-3-pt',
  },
  {
    id: '5',
    name: 'iTunes Gift Card 4 EURO NL iTunes Gift Card (NL)',
    subtext: 'iTunes Gift Card (NL)',
    image: placeholderImage('iTunes'),
    discount: '-3.0%',
    href: '/promo/itunes-4-nl',
  },
];

const features = [
  {
    title: 'ENDLESS POSSIBILITY. INSTANT DELIVERY.',
    description: 'Get new apps from the AppStore or reload game currency, you can do it all with the iTunes Gift Card. SEAGM offers multiple denominations for you to choose from. Instant delivery with 24/7 live support, globally trusted.',
    imageSrc: 'https://via.placeholder.com/600x400?text=iTunes+Gift+Card',
    imageAlt: 'iTunes Gift Card feature',
  },
  {
    title: 'TURN YOUR SMARTPHONE INTO A GAME, MOVIE AND BOOK LIBRARY!',
    description: 'Top up your Google Play Balance with the Google Play Gift card and start growing your collection! Buy game booster packs, rent a movie or read an ebook - all from the convenience of your smartphone. SEAGM offers cards for up to 15 regions, including US, EU, UK, HK and more!',
    imageSrc: 'https://via.placeholder.com/600x400?text=Google+Play',
    imageAlt: 'Google Play feature',
    imageOnLeft: true,
  },
  {
    title: 'THE GO-TO FOR MOBILE GAMING, RAZER GOLD.',
    description: 'Reload currency for your favorite mobile game such as Mobile Legends with Razer Gold! SEAGM has a wide range of selection up to 8 regions. Instant delivery with 24/7 live support, globally trusted.',
    imageSrc: 'https://via.placeholder.com/600x400?text=Razer+Gold',
    imageAlt: 'Razer Gold feature',
  },
  {
    title: 'NINTENDO ESHOP PREPAID CARD',
    description: "With the Nintendo eShop Gift Card, you can now subscribe to Nintendo Switch Online! The service lets you save your game data to cloud plus enable online play. Take advantage of the special offers in the eShop as well with SEAGM's selection of Nintendo eShop Gift Card!",
    imageSrc: 'https://via.placeholder.com/600x400?text=Nintendo+eShop',
    imageAlt: 'Nintendo eShop feature',
    imageOnLeft: true,
  },
];

export default function MarketplacePage() {
  const { theme } = useTheme();
  
  return (
    <main className={theme === 'dark' ? 'bg-digital-black' : 'bg-cloud-white'}>
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-10">
        {/* Feature Sections */}
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
            imageOnLeft={feature.imageOnLeft}
          />
        ))}
        
        {/* Exclusive Offers */}
        <PromoSection
          title="EXCLUSIVE OFFERS"
          subtitle="Don't miss our limited-time offers! Discover current deals today!"
          promoItems={exclusiveOffers}
        />
        
        {/* Popular Game Cards */}
        <ProductSection
          title="POPULAR GAME CARD"
          viewMoreHref="/browse/game-cards"
          products={popularGameCards}
        />
        
        {/* Popular Game Top-Ups */}
        <ProductSection
          title="POPULAR GAME TOP-UP"
          viewMoreHref="/browse/top-ups"
          products={popularGameTopUps}
        />
      </div>
      
      <Footer />
    </main>
  );
} 