import { Theme } from 'shared/lib/theme'
import { createContext } from 'react'

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'system',
  setTheme: () => {}
})
