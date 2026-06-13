'use client'

import React from 'react'
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'

interface AdminStatsProps {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
}

export function AdminStats({
  totalProducts,
  totalOrders,
  totalUsers,
  totalRevenue,
}: AdminStatsProps) {
  const stats = [
    {
      label: 'محصولات',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'سفارش‌ها',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      label: 'کاربران',
      value: totalUsers,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'درآمد کل',
      value: `${totalRevenue.toLocaleString('fa-IR')} تومان`,
      icon: TrendingUp,
      color: 'bg-pink-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof stat.value === 'number' ? stat.value.toLocaleString('fa-IR') : stat.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
