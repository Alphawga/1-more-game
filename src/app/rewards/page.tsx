'use client';

import Navbar from '@/components/Navbar';
import { Trophy, Gift, Users, Sparkles, ChevronRight, Star } from 'lucide-react';

const rewardTiers = [
  {
    name: 'Bronze',
    points: '0 - 1000',
    benefits: ['5% cashback', 'Weekly rewards', 'Email support'],
    color: 'from-[#CD7F32]/20 to-[#CD7F32]/40',
    textColor: 'text-[#CD7F32]',
  },
  {
    name: 'Silver',
    points: '1001 - 5000',
    benefits: ['7.5% cashback', 'Daily rewards', 'Priority support', 'Exclusive deals'],
    color: 'from-[#C0C0C0]/20 to-[#C0C0C0]/40',
    textColor: 'text-[#C0C0C0]',
  },
  {
    name: 'Gold',
    points: '5001+',
    benefits: ['10% cashback', 'VIP rewards', '24/7 support', 'Early access', 'Special events'],
    color: 'from-victory-gold/20 to-victory-gold/40',
    textColor: 'text-victory-gold',
  },
];

const achievements = [
  { name: 'First Purchase', icon: Gift, progress: 100 },
  { name: 'Social Sharer', icon: Users, progress: 60 },
  { name: 'Power Buyer', icon: Sparkles, progress: 30 },
  { name: 'Loyal Customer', icon: Trophy, progress: 80 },
];

export default function Rewards() {
  return (
    <main className="min-h-screen bg-digital-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cloud-white mb-4">
            Rewards & <span className="text-energy-orange">Loyalty</span> Program
          </h1>
          <p className="text-lg text-cloud-white/80">
            Earn points, unlock achievements, and get exclusive rewards
          </p>
        </div>

        {/* User Stats */}
        <div className="glass-effect rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-sm text-cloud-white/60 mb-2">Current Points</h3>
              <p className="text-3xl font-bold text-energy-orange">2,450</p>
            </div>
            <div>
              <h3 className="text-sm text-cloud-white/60 mb-2">Current Tier</h3>
              <p className="text-3xl font-bold text-[#C0C0C0]">Silver</p>
            </div>
            <div>
              <h3 className="text-sm text-cloud-white/60 mb-2">Next Tier In</h3>
              <p className="text-3xl font-bold text-victory-gold">2,550 pts</p>
            </div>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-cloud-white mb-6">Reward Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewardTiers.map((tier) => (
              <div
                key={tier.name}
                className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform"
              >
                <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${tier.textColor}`}>{tier.name}</h3>
                  <p className="text-sm text-cloud-white/60 mb-4">{tier.points} points</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-cloud-white">
                        <Star className="w-4 h-4 mr-2 text-energy-orange" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-cloud-white mb-6">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-energy-orange/10">
                    <achievement.icon className="w-6 h-6 text-energy-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-cloud-white mb-2">
                      {achievement.name}
                    </h3>
                    <div className="relative h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-energy-orange rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-cloud-white/60 mt-1">
                      {achievement.progress}% completed
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cloud-white/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 