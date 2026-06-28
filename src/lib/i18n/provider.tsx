"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { en } from "./dictionaries/en";
import { ptBR } from "./dictionaries/pt-BR";
import type { Locale, TranslationDict } from "./types";

const STORAGE_KEY = "wacrm-locale";
const DEFAULT_LOCALE: Locale = "en";

const LOCALE_BOOT_SCRIPT = `
(function(){
  try {
    var key = ${JSON.stringify(STORAGE_KEY)};
    var saved = localStorage.getItem(key);
    if (saved === 'pt-BR' || saved === 'en') {
      document.documentElement.lang = saved === 'pt-BR' ? 'pt-BR' : 'en';
    }
  } catch(_e) {}
})();
`;

const dictionaries: Record<Locale, TranslationDict> = { en, "pt-BR": ptBR };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolveNested(obj: unknown, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [dict, setDict] = useState<TranslationDict>(dictionaries[DEFAULT_LOCALE]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt-BR" || saved === "en") {
        setLocaleState(saved);
        setDict(dictionaries[saved]);
        document.documentElement.lang = saved === "pt-BR" ? "pt-BR" : "en";
      }
    } catch {
      // localStorage not available
    }
    setReady(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // localStorage not available
    }
    setLocaleState(newLocale);
    setDict(dictionaries[newLocale]);
    document.documentElement.lang = newLocale === "pt-BR" ? "pt-BR" : "en";
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const value = resolveNested(dict, key);
      if (typeof value !== "string") return key;
      if (!vars) return value;
      return Object.entries(vars).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
        value,
      );
    },
    [dict],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key) => key,
    };
  }
  return ctx;
}

export { LOCALE_BOOT_SCRIPT, STORAGE_KEY, DEFAULT_LOCALE };
