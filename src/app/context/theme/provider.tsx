// src/app/providers/ThemeProvider.tsx
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { applyTheme, Theme } from 'shared/lib/theme'
import { ThemeContext } from 'app/context/theme/context'

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext) as any
  return { theme, setTheme }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system'
  })

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
