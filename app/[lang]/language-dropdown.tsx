'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';

const locales = [
  { locale: 'en', name: 'English' },
  { locale: 'bn', name: 'বাংলা' },
];

export function LanguageDropdown({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const current = pathname.split('/')[1];
  const active =
    locales.find((item) => item.locale === current)?.name ?? 'English';

  return (
    <label className={`relative inline-flex items-center ${className ?? ''}`}>
      <Languages className="pointer-events-none absolute left-2 size-3.5 text-fd-muted-foreground" />
      <select
        aria-label="Choose a language"
        value={current}
        onChange={(event) => {
          const parts = pathname.split('/');
          parts[1] = event.target.value;
          router.push(parts.join('/') || `/${event.target.value}`);
        }}
        className="h-8 cursor-pointer appearance-none rounded-full border border-fd-border bg-fd-card pl-7 pr-5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      >
        {locales.map((item) => (
          <option key={item.locale} value={item.locale}>
            {item.name}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-[10px] text-fd-muted-foreground">
        ▾
      </span>
    </label>
  );
}