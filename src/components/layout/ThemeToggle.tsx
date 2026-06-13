'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>('light')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const storedTheme = localStorage.getItem('theme') || 'light'
    setTheme(storedTheme)
    
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (!isMounted) {
    return <button className="p-2" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
      title={theme === 'light' ? 'حالت شب' : 'حالت روز'}
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-gray-700" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  )
}
