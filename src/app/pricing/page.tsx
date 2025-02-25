'use client';

import Navbar from '@/components/Navbar';
import { Check, Shield, Zap, Clock, Gift } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Basic rewards program',
      'Standard support',
      'Regular payment methods',
      'Market prices',
    ],
    color: 'from-cloud-white/20 to-cloud-white/40',
    textColor: 'text-cloud-white',
    buttonClass: 'border border-cloud-white text-cloud-white hover:bg-cloud-white/10',
  },
  {
    name: 'Pro Gamer',
    price: '$9.99',
    period: '/month',
    description: 'Best value for enthusiasts',
    features: [
      'Enhanced rewards (2x points)',
      'Priority support 24/7',
      'Exclusive payment methods',
      '5% discount on all purchases',
      'Early access to deals',
      'Monthly bonus credits',
    ],
    color: 'from-energy-orange/20 to-energy-orange/40',
    textColor: 'text-energy-orange',
    buttonClass: 'bg-energy-orange hover:bg-energy-orange-hover text-white',
    popular: true,
  },
  {
    name: 'Ultimate',
    price: '$19.99',
    period: '/month',
    description: 'For serious gamers',
    features: [
      'Maximum rewards (3x points)',
      'VIP support with dedicated agent',
      'All payment methods',
      '10% discount on all purchases',
      'First access to new features',
      'Monthly premium bundle',
      'Custom profile badge',
    ],
    color: 'from-victory-gold/20 to-victory-gold/40',
    textColor: 'text-victory-gold',
    buttonClass: 'bg-victory-gold hover:bg-victory-gold/90 text-digital-black',
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Every purchase is protected by our secure payment system',
  },
  {
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Get your gaming products delivered instantly after purchase',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Access to our support team whenever you need assistance',
  },
  {
    icon: Gift,
    title: 'Exclusive Rewards',
    description: 'Earn points and get access to exclusive gaming rewards',
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen bg-digital-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cloud-white mb-4">
            Simple, <span className="text-energy-orange">Transparent</span> Pricing
          </h1>
          <p className="text-lg text-cloud-white/80">
            Choose the perfect plan for your gaming needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform relative ${
                tier.popular ? 'ring-2 ring-energy-orange' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4">
                  <span className="bg-energy-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
              <div className="p-8">
                <h3 className={`text-xl font-bold mb-2 ${tier.textColor}`}>{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-cloud-white">{tier.price}</span>
                  {tier.period && (
                    <span className="text-cloud-white/60 ml-2">{tier.period}</span>
                  )}
                </div>
                <p className="text-cloud-white/60 mb-6">{tier.description}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-cloud-white">
                      <Check className="w-5 h-5 mr-3 text-energy-orange" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${tier.buttonClass}`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div>
          <h2 className="text-2xl font-bold text-cloud-white text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="glass-effect p-6 rounded-2xl text-center hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-energy-orange/10">
                    <benefit.icon className="w-6 h-6 text-energy-orange" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-cloud-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-cloud-white/60">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-16">
          <p className="text-cloud-white/80">
            Have questions? Check out our{' '}
            <a href="/support" className="text-energy-orange hover:text-energy-orange-hover">
              FAQ section
            </a>
          </p>
        </div>
      </div>
    </main>
  );
} 