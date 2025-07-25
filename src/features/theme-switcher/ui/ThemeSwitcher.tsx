import React, { useEffect, useRef, useState } from 'react'
import type { Theme } from '@/shared/lib/theme'
import { useTheme } from 'app/context/theme'

const THEMES: { code: Theme; label: string }[] = [
  { code: 'light', label: 'Light' },
  { code: 'dark', label: 'Dark' },
  { code: 'system', label: 'System' }
]

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleThemeChange = (code: Theme) => {
    setTheme(code)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative z-50 inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true">
        Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="ring-opacity-5 absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-800"
          role="menu"
          aria-orientation="vertical">
          <div className="py-1">
            {THEMES.map((item) => (
              <button
                key={item.code}
                onClick={() => handleThemeChange(item.code)}
                className={`block w-full cursor-pointer px-4 py-2 text-left text-sm ${
                  theme === item.code
                    ? 'bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
                role="menuitem">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
