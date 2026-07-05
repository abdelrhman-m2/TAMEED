import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { dictionaries, type Lang, type Dict } from "./dictionaries";

type I18nCtx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: <T = string>(key: string) => T;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const Ctx = createContext<I18nCtx | null>(null);

const STORAGE_KEY = "taamed.lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ar";
    return (localStorage.getItem(STORAGE_KEY) as Lang) || "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const value = useMemo<I18nCtx>(() => {
    const dict: Dict = dictionaries[lang];
    return {
      lang,
      dir,
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "ar" ? "en" : "ar")),
      t: (<T,>(key: string): T => {
        const parts = key.split(".");
        let cur: unknown = dict;
        for (const p of parts) {
          if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
            cur = (cur as Record<string, unknown>)[p];
          } else {
            return key as unknown as T;
          }
        }
        return cur as T;
      }) as I18nCtx["t"],
    };
  }, [lang, dir]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
