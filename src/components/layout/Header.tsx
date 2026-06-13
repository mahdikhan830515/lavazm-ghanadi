'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, LogOut, User, Home, Settings } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'

export function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const { user, logout } = useAuthStore()
  const { getItemCount } = useCartStore()
  const itemCount = getItemCount()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!isMounted) {
    return (
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16" />
      </header>
    )
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600 dark:text-pink-400">
          لوازم قنادی
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition">
            صفحه اصلی
          </Link>
          <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition">
            محصولات
          </Link>
          {user?.role === 'ADMIN' && (
            <Link href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition">
              پنل ادمین
            </Link>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/account" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition hidden md:block">
                <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition hidden md:block"
              >
                <LogOut className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
              ورود
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">
              صفحه اصلی
            </Link>
            <Link href="/products" className="block text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">
              محصولات
            </Link>
            {user?.role === 'ADMIN' && (
              <Link href="/admin" className="block text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">
                پنل ادمین
              </Link>
            )}
            {user ? (
              <>
                <Link href="/account" className="block text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">
                  حساب کاربری
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-right text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
                >
                  خروج
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="block text-pink-600 dark:text-pink-400 font-semibold">
                ورود
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
