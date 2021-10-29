export type ThemeType = 'dark' | 'light' | string | null

export interface Theme {
  name: string,
  type: ThemeType,
  colors: { [key: string]: string }
  get(key: string, value?: string | Theme): string | null
  set(key: string, value: string | Theme): Theme
  has(key: string): boolean
  extend(value: Theme, rewrite?: boolean): Theme
  toString(): string;
}

export function createTheme(name: string, type?: ThemeType): Theme {
  let theme: Theme = {
    name,
    type: type || null,
    colors: {},
    set(key, value) {
      if (typeof value === 'string') this.colors[key] = value
      if (typeof key === 'string' && typeof value === 'object' && value.colors) this.colors[key] = value.colors[key]
      return this
    },
    has(key) {
      return this.colors[key] !== undefined
    },
    get(key, value) {
      if (this.has(key)) return this.colors[key]
      if (typeof value === 'object') return value.get(key)
      if (typeof value === 'string') return value
      return null
    },
    extend(value, overwrite = false) {
      let colors = value.colors
      for (let [key, val] of Object.entries(colors)) {
        if (!this.has(key) || overwrite) this.set(key, val)
      }
      return this;
    },
    toString() {
      return JSON.stringify(this)
    }
  }

  return theme
} 