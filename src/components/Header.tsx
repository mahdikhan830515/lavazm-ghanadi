'use client'

import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCartStore()
  const { user } = useAuthStore()

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-pink-600">
            <span>🎂</span>
            لوازم قنادی
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition">
              محصولات
            </Link>
            <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition">
              درباره
            </Link>
            <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition">
              تماس
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 transition">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link href="/profile" className="p-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 transition">
                <User className="w-6 h-6" />
              </Link>
            ) : (
              <Link href="/auth/login" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-sm font-semibold">
                ورود
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-pink-600">
              محصولات
            </Link>
            <Link href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-pink-600">
              درباره
            </Link>
            <Link href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-pink-600">
              تماس
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
