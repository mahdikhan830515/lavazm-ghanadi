'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { validatePhoneNumber } from '@/lib/validations'

export default function LoginPage() {
  const router = useRouter()
  const { setUser, setToken } = useAuthStore()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validatePhoneNumber(phoneNumber)) {
      setError('شماره تلفن نامعتبر است')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      setStep('otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ارسال کد')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!otp || otp.length !== 6) {
      setError('کد تایید باید ۶ رقم باشد')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      const data = await response.json()
      setUser(data.user)
      setToken(data.token)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در تایید کد')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">ورود</h1>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="09xxxxxxxxx"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-semibold disabled:opacity-50"
              >
                {isLoading ? 'درحال ارسال...' : 'ارسال کد تایید'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">کد تایید را وارد کنید</p>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  کد تایید
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 text-center text-2xl tracking-widest"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-semibold disabled:opacity-50"
              >
                {isLoading ? 'درحال تایید...' : 'تایید و ورود'}
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full mt-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                بازگشت
              </button>
            </form>
          )}

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            اکانت ندارید؟ <Link href="#" className="text-pink-600 hover:text-pink-700 font-semibold">ثبت‌نام کنید</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
