'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

interface ProductCardProps {
  id: string
  title: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  stock: number
}

export function ProductCard({
  id,
  title,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  stock,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCartStore()

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (stock <= 0) return

    setIsAdding(true)
    
    addItem({
      productId: id,
      title,
      price,
      image,
      quantity: 1,
    })

    setTimeout(() => setIsAdding(false), 300)
  }

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative bg-gray-100 dark:bg-gray-700 aspect-square overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              {discount}% تخفیف
            </div>
          )}

          {/* Stock Status */}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">ناموجود</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">({reviews})</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-pink-600 dark:text-pink-400">
                {price.toLocaleString('fa-IR')} تومان
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {originalPrice.toLocaleString('fa-IR')}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={stock === 0 || isAdding}
            className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-semibold text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {stock === 0 ? 'ناموجود' : isAdding ? 'افزوده می‌شود...' : 'افزودن به سبد'}
          </button>
        </div>
      </div>
    </Link>
  )
}
