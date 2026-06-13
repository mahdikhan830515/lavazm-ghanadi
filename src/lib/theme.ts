export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type Theme = typeof THEMES[keyof typeof THEMES]

export function isValidTheme(theme: string): theme is Theme {
  return Object.values(THEMES).includes(theme as Theme)
}
