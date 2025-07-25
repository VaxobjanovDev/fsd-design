// src/shared/lib/theme.ts
export type Theme = 'light' | 'dark' | 'system'

export const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    root.classList.add(systemDark ? 'dark' : 'light')
  } else {
    root.classList.add(theme)
  }
}
