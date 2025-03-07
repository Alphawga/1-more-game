'use client';

import { useState, useEffect } from 'react';

// Dashboard Card component
const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  colorClass = 'bg-blue-500',
  change = null
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  colorClass?: string;
  change?: { value: number; positive: boolean } | null;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        
        {change && (
          <div className={`flex items-center mt-2 text-sm ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
            <span>
              {change.positive ? '↑' : '↓'} {Math.abs(change.value)}%
            </span>
            <span className="ml-1 text-gray-400 dark:text-gray-500">vs last month</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dashboardCards = [
    {
      title: 'Total Sales',
      value: '$12,345',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: 'bg-energy-orange',
      change: { value: 12.5, positive: true }
    },
    {
      title: 'Total Orders',
      value: '543',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      colorClass: 'bg-trust-blue',
      change: { value: 8.2, positive: true }
    },
    {
      title: 'Active Products',
      value: '128',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      colorClass: 'bg-victory-gold',
      change: { value: 4.1, positive: true }
    },
    {
      title: 'Active Users',
      value: '2,453',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      colorClass: 'bg-violet-500',
      change: { value: 2.3, positive: true }
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your admin dashboard. Here you can manage products, orders, and more.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-32 animate-pulse">
              <div className="flex justify-between h-full">
                <div className="space-y-2 w-2/3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <DashboardCard 
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              colorClass={card.colorClass}
              change={card.change}
            />
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td className="px-4 py-3 font-medium">#ORD-001</td>
                      <td className="px-4 py-3">John Doe</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-3">$124.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">#ORD-002</td>
                      <td className="px-4 py-3">Jane Smith</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Processing
                        </span>
                      </td>
                      <td className="px-4 py-3">$75.50</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">#ORD-003</td>
                      <td className="px-4 py-3">Robert Johnson</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3">$246.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">#ORD-004</td>
                      <td className="px-4 py-3">Michael Brown</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-3">$89.99</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">#ORD-005</td>
                      <td className="px-4 py-3">Emily Wilson</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Failed
                        </span>
                      </td>
                      <td className="px-4 py-3">$132.50</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <a href="/admin/orders" className="text-sm text-trust-blue dark:text-blue-400 hover:underline">View all orders →</a>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
          <div className="space-y-4">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-sm font-medium">PSN</div>
                  <div className="flex-1">
                    <p className="font-medium">PlayStation Network Card</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">243 sales</p>
                  </div>
                  <div className="font-medium">$2,874</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-sm font-medium">FF</div>
                  <div className="flex-1">
                    <p className="font-medium">Free Fire Diamonds</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">187 sales</p>
                  </div>
                  <div className="font-medium">$1,965</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-sm font-medium">PUBG</div>
                  <div className="flex-1">
                    <p className="font-medium">PUBG Mobile UC</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">154 sales</p>
                  </div>
                  <div className="font-medium">$1,543</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-sm font-medium">Steam</div>
                  <div className="flex-1">
                    <p className="font-medium">Steam Wallet Code</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">132 sales</p>
                  </div>
                  <div className="font-medium">$1,320</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-sm font-medium">ML</div>
                  <div className="flex-1">
                    <p className="font-medium">Mobile Legends Diamonds</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">118 sales</p>
                  </div>
                  <div className="font-medium">$1,085</div>
                </div>
              </>
            )}
          </div>
          <div className="mt-4">
            <a href="/admin/products" className="text-sm text-trust-blue dark:text-blue-400 hover:underline">View all products →</a>
          </div>
        </div>
      </div>
    </div>
  );
} 