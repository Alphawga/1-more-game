'use client';

import Navbar from '@/components/Navbar';
import { Wallet, ShoppingBag, Clock, Bell, Settings, ChevronRight, Package } from 'lucide-react';

const recentOrders = [
  {
    id: '#ORD-123',
    product: 'PUBG Mobile UC',
    amount: '$49.99',
    status: 'completed',
    date: '2024-02-20',
  },
  {
    id: '#ORD-122',
    product: 'Fortnite V-Bucks',
    amount: '$19.99',
    status: 'processing',
    date: '2024-02-19',
  },
  {
    id: '#ORD-121',
    product: 'Steam Wallet Code',
    amount: '$100.00',
    status: 'completed',
    date: '2024-02-18',
  },
];

const quickActions = [
  { name: 'Add Funds', icon: Wallet, color: 'bg-energy-orange/10 text-energy-orange' },
  { name: 'My Orders', icon: ShoppingBag, color: 'bg-trust-blue/10 text-trust-blue' },
  { name: 'History', icon: Clock, color: 'bg-victory-gold/10 text-victory-gold' },
  { name: 'Settings', icon: Settings, color: 'bg-cloud-white/10 text-cloud-white' },
];

const notifications = [
  {
    title: 'Order Delivered',
    message: 'Your PUBG Mobile UC has been delivered',
    time: '2 hours ago',
  },
  {
    title: 'Special Offer',
    message: '50% off on Steam Wallet Codes',
    time: '5 hours ago',
  },
  {
    title: 'Points Earned',
    message: 'You earned 100 points from your last purchase',
    time: '1 day ago',
  },
];

export default function Dashboard() {
  

  return (
    <main className="min-h-screen bg-digital-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="glass-effect rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-cloud-white mb-2">
                Welcome back, <span className="text-energy-orange">John</span>
              </h1>
              <p className="text-cloud-white/60">Here&apos;s what&apos;s happening with your account</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-6 py-2 bg-energy-orange hover:bg-energy-orange-hover text-white rounded-lg transition-colors">
                Add Funds
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action) => (
            <button
              key={action.name}
              className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-cloud-white">{action.name}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-cloud-white/40" />
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cloud-white">Recent Orders</h2>
              <Package className="w-6 h-6 text-energy-orange" />
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg bg-digital-black/30 hover:bg-digital-black/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-cloud-white">{order.product}</h3>
                    <span className="text-victory-gold font-semibold">{order.amount}</span>
                  </div>
                  <div className="flex items-center text-sm text-cloud-white/60">
                    <span>{order.id}</span>
                    <span className="mx-2">•</span>
                    <span>{order.date}</span>
                    <span className="mx-2">•</span>
                    <span className={`capitalize ${
                      order.status === 'completed' ? 'text-growth-green' : 'text-energy-orange'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cloud-white">Notifications</h2>
              <Bell className="w-6 h-6 text-energy-orange" />
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.title}
                  className="p-4 rounded-lg bg-digital-black/30 hover:bg-digital-black/50 transition-colors"
                >
                  <h3 className="font-semibold text-cloud-white mb-1">{notification.title}</h3>
                  <p className="text-sm text-cloud-white/60 mb-2">{notification.message}</p>
                  <span className="text-xs text-cloud-white/40">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 