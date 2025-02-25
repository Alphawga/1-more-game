'use client';

import Navbar from '@/components/Navbar';
import { Trophy, MessageSquare, Users, TrendingUp, Crown, Medal } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'GamerPro123', points: 12500, avatar: '👑' },
  { rank: 2, name: 'EpicPlayer', points: 11200, avatar: '🎮' },
  { rank: 3, name: 'VictoryQueen', points: 10800, avatar: '🏆' },
  { rank: 4, name: 'LegendStatus', points: 9500, avatar: '⚔️' },
  { rank: 5, name: 'GameMaster', points: 9200, avatar: '🎯' },
];

const discussions = [
  {
    title: 'Best gaming deals this week',
    author: 'DealHunter',
    replies: 45,
    likes: 123,
    time: '2h ago',
  },
  {
    title: 'New Battle Pass Season!',
    author: 'GameNews',
    replies: 89,
    likes: 234,
    time: '4h ago',
  },
  {
    title: 'Tips for new players',
    author: 'ProGamer',
    replies: 67,
    likes: 156,
    time: '6h ago',
  },
];

const stats = [
  { label: 'Active Members', value: '10,234', icon: Users },
  { label: 'Daily Discussions', value: '156', icon: MessageSquare },
  { label: 'Total Rewards', value: '45,678', icon: Trophy },
  { label: 'Points Earned', value: '789,012', icon: TrendingUp },
];

export default function Community() {
  return (
    <main className="min-h-screen bg-digital-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cloud-white mb-4">
            Gaming <span className="text-energy-orange">Community</span>
          </h1>
          <p className="text-lg text-cloud-white/80">
            Connect with fellow gamers, share experiences, and climb the leaderboards
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-effect p-6 rounded-2xl text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-energy-orange/10">
                  <stat.icon className="w-6 h-6 text-energy-orange" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-cloud-white mb-1">{stat.value}</h3>
              <p className="text-sm text-cloud-white/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cloud-white">Top Players</h2>
              <Crown className="w-6 h-6 text-victory-gold" />
            </div>
            <div className="space-y-4">
              {leaderboardData.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center p-4 rounded-lg bg-digital-black/30 hover:bg-digital-black/50 transition-colors"
                >
                  <div className="w-8 font-bold text-cloud-white/60">{player.rank}</div>
                  <div className="w-10 h-10 flex items-center justify-center text-2xl">
                    {player.avatar}
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold text-cloud-white">{player.name}</h3>
                    <p className="text-sm text-cloud-white/60">{player.points.toLocaleString()} points</p>
                  </div>
                  <Medal className={`w-6 h-6 ${
                    player.rank === 1 ? 'text-victory-gold' :
                    player.rank === 2 ? 'text-[#C0C0C0]' :
                    player.rank === 3 ? 'text-[#CD7F32]' :
                    'text-cloud-white/20'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Discussions */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cloud-white">Recent Discussions</h2>
              <MessageSquare className="w-6 h-6 text-energy-orange" />
            </div>
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.title}
                  className="p-4 rounded-lg bg-digital-black/30 hover:bg-digital-black/50 transition-colors"
                >
                  <h3 className="font-semibold text-cloud-white mb-2">{discussion.title}</h3>
                  <div className="flex items-center text-sm text-cloud-white/60">
                    <span>by {discussion.author}</span>
                    <span className="mx-2">•</span>
                    <span>{discussion.time}</span>
                    <span className="mx-2">•</span>
                    <span>{discussion.replies} replies</span>
                    <span className="mx-2">•</span>
                    <span>{discussion.likes} likes</span>
                  </div>
                </div>
              ))}
              <button className="w-full mt-4 py-3 text-center text-energy-orange hover:text-energy-orange-hover transition-colors">
                View All Discussions
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 