"use client";

import { Check, Languages } from "lucide-react";
import { useI18n, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOCALES = [
  { value: "en" as const, label: "English" },
  { value: "pt-BR" as const, label: "Português (Brasil)" },
];

export function LanguageSwitcher() {
  const { t } = useT();
  const { locale, setLocale } = useI18n();

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Languages className="size-4 text-muted-foreground" />
        {t('settings.appearance.language')}
      </h3>

      <div
        role="radiogroup"
        aria-label={t('settings.appearance.language')}
        className="grid max-w-md grid-cols-2 gap-3"
      >
        {LOCALES.map((l) => (
          <button
            key={l.value}
            type="button"
            role="radio"
            onClick={() => setLocale(l.value)}
            aria-checked={l.value === locale}
            className={cn(
              "flex items-center gap-3 rounded-lg border bg-card p-4 text-left transition-colors",
              l.value === locale
                ? "border-primary/60 ring-2 ring-primary/40"
                : "border-border hover:border-border hover:bg-muted/40",
            )}
          >
            <span className="flex-1 text-sm font-semibold text-foreground">
              {l.label}
            </span>
            {l.value === locale && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
                <Check className="h-3 w-3" />
                {t('settings.appearance.active')}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
