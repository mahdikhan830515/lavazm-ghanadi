'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Phone, MapPin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">لوازم قنادی</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              بهترین فروشگاه آنلاین لوازم قنادی و شیرینی سازی
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">لینک‌های مفید</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  محصولات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">خدمات مشتری</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  شرایط ارسال
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  بازگشت کالا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">تماس با ما</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@lavazm-ghanadi.ir</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>تهران، ایران</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © ۱۴۰۳ لوازم قنادی. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
