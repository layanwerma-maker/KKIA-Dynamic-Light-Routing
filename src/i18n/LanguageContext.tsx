import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../types'
import en from './en'
import ar from './ar'
import type { Dictionary } from './en'

const dictionaries: Record<Lang, Dictionary> = { en, ar }

interface LanguageContextValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (path: string) => string
  dict: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = window.localStorage.getItem('kkia-lang')
      if (stored === 'en' || stored === 'ar') return stored
    } catch {
      /* ignore */
    }
    return 'en'
  })

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      window.localStorage.setItem('kkia-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  const setLang = (next: Lang) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === 'en' ? 'ar' : 'en'))

  const t = useMemo(() => {
    const dict = dictionaries[lang]
    return (path: string) => {
      const value = getPath(dict, path)
      return typeof value === 'string' ? value : path
    }
  }, [lang])

  const value: LanguageContextValue = {
    lang,
    dir,
    setLang,
    toggleLang,
    t,
    dict: dictionaries[lang],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
